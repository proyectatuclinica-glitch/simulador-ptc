// ============================================================
// SIMULADOR ANTES/DESPUES - Proyecta tu Clinica
// ------------------------------------------------------------
// Herramienta interna para que el cliente (clinica) la use en
// consulta, delante del paciente. No hay CRM, ni tags, ni capas
// intermedias: entra, sube foto, genera, ensena el resultado.
//
// Acceso: pantalla de login propia (con la marca) + sesion por cookie
// firmada. Cada clinica tiene su usuario/contrasena, definidos en las
// variables de entorno (ver loadClinics mas abajo).
// ============================================================

require("dotenv").config();
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const { CASES, CANAS_OPTIONS, CANAS_TEXT, FOTOTIPO_OPTIONS, FOTOTIPO_TEXT } = require("./prompts");

const app = express();
const PORT = process.env.PORT || 3000;
app.set("trust proxy", 1); // Render esta detras de un proxy: asi req.secure detecta bien https

// Limite generoso para admitir fotos moviles en base64 (~10-12MB tipico)
app.use(express.json({ limit: "20mb" }));

// ---- Acceso: un usuario/contrasena por clinica ----
// Se definen como variables de entorno CLINIC1_USER / CLINIC1_PASS /
// CLINIC1_NAME, CLINIC2_USER / CLINIC2_PASS / CLINIC2_NAME, etc. Anadir
// una clinica nueva es solo anadir su trio de variables en Render - no
// hace falta tocar codigo ni redesplegar desde GitHub.
function loadClinics() {
  const clinics = [];
  for (let i = 1; i <= 30; i++) {
    const user = process.env[`CLINIC${i}_USER`];
    const pass = process.env[`CLINIC${i}_PASS`];
    if (user && pass) {
      clinics.push({ user, pass, name: process.env[`CLINIC${i}_NAME`] || user, isAdmin: false });
    }
  }
  // Usuario admin (tu, Proyecta tu Clinica): mismo mecanismo de login,
  // pero con acceso a la pantalla de estadisticas de todas las clinicas.
  if (process.env.ADMIN_USER && process.env.ADMIN_PASS) {
    clinics.push({
      user: process.env.ADMIN_USER,
      pass: process.env.ADMIN_PASS,
      name: process.env.ADMIN_NAME || "Admin",
      isAdmin: true
    });
  }
  return clinics;
}
const CLINICS = loadClinics();

function findClinicByUser(user) {
  if (CLINICS.length > 0) return CLINICS.find((c) => c.user === user) || null;
  // Compatibilidad: sin clinicas individuales configuradas, se usa el
  // acceso unico anterior (ACCESS_USER / ACCESS_PASSWORD).
  const fallbackUser = process.env.ACCESS_USER || "clinica";
  return user === fallbackUser ? { user: fallbackUser, name: fallbackUser } : null;
}

function checkPassword(user, pass) {
  if (CLINICS.length > 0) {
    const match = CLINICS.find((c) => c.user === user && c.pass === pass);
    return match || null;
  }
  const fallbackUser = process.env.ACCESS_USER || "clinica";
  const fallbackPass = process.env.ACCESS_PASSWORD;
  if (fallbackPass && user === fallbackUser && pass === fallbackPass) {
    return { user: fallbackUser, name: fallbackUser };
  }
  return null;
}

// ---- Sesion: cookie firmada (HMAC), sin dependencias externas ----
// Si no se define SESSION_SECRET, se genera una al arrancar - funciona
// igual, solo que las sesiones activas se cierran si el servidor se
// reinicia. Para que no pase, se puede fijar SESSION_SECRET en Render
// (cualquier texto largo al azar sirve).
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(24).toString("hex");
const COOKIE_NAME = "ptc_session";

function signToken(user) {
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(user).digest("hex");
  return `${user}.${sig}`;
}
function verifyToken(token) {
  if (!token) return null;
  const idx = token.lastIndexOf(".");
  if (idx === -1) return null;
  const user = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(user).digest("hex");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  return crypto.timingSafeEqual(sigBuf, expBuf) ? user : null;
}
function getCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  const found = header.split(";").map((s) => s.trim()).find((s) => s.startsWith(name + "="));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
}

// La pagina de login y sus assets se sirven SIN exigir sesion.
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get(["/logo.png", "/icon.png", "/manifest.json", "/apple-touch-icon.png", "/icon-192.png", "/icon-512.png"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", req.path));
});

app.post("/login", (req, res) => {
  const { user, pass } = req.body || {};
  const clinic = user && pass ? checkPassword(user, pass) : null;
  if (!clinic) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos." });
  }
  res.cookie(COOKIE_NAME, signToken(clinic.user), {
    httpOnly: true,
    sameSite: "lax",
    secure: req.secure,
    maxAge: 90 * 24 * 60 * 60 * 1000 // 90 dias: uso en tablet/ordenador compartido de consulta
  });
  res.json({ ok: true });
});

app.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
});

function requireAuth(req, res, next) {
  const user = verifyToken(getCookie(req, COOKIE_NAME));
  const clinic = user ? findClinicByUser(user) : null;

  if (!clinic) {
    if (req.path.startsWith("/api/")) {
      return res.status(401).json({ error: "Sesion no iniciada." });
    }
    return res.redirect("/login.html");
  }
  req.clinic = clinic;
  next();
}

app.use(requireAuth);
app.use(express.static("public"));

// ---- Cliente Gemini ----
// Lee la API key automaticamente de la variable de entorno GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-3.1-flash-image";

// ---- Registro de uso: manda una linea a una Google Sheet (via un
// Apps Script Web App) cada vez que una clinica genera una simulacion.
// Si no esta configurada la variable SHEETS_WEBHOOK_URL, simplemente no
// registra nada - no rompe la generacion de la imagen en ningun caso. ----
async function logUsage(clinic, caseLabel) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url || !clinic) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clinic: clinic.user,
      clinicName: clinic.name,
      case: caseLabel,
      timestamp: new Date().toISOString()
    })
  });
}

// Identidad de la sesion actual: el frontend lo usa para saber si mostrar
// el boton de "Ver estadisticas" (solo al usuario admin).
app.get("/api/me", (req, res) => {
  res.json({ name: req.clinic.name, isAdmin: !!req.clinic.isAdmin });
});

// Estadisticas de uso (solo admin): hace de intermediario hacia la Google
// Sheet, para no exponer la URL del Apps Script al navegador y para que
// solo tu usuario pueda consultarlo.
app.get("/api/admin/stats", async (req, res) => {
  if (!req.clinic.isAdmin) {
    return res.status(403).json({ error: "No autorizado." });
  }
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    return res.status(500).json({ error: "Todavia no se ha conectado la Google Sheet (falta SHEETS_WEBHOOK_URL)." });
  }
  try {
    const sep = url.includes("?") ? "&" : "?";
    const r = await fetch(`${url}${sep}action=stats`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("Error leyendo estadisticas de la hoja:", err.message);
    res.status(502).json({ error: "No se pudo leer la hoja de registro." });
  }
});

// Expone al frontend la lista de casos disponibles (sin el prompt, que es interno)
app.get("/api/cases", (req, res) => {
  res.json(CASES.map(({ value, label }) => ({ value, label })));
});

// Opciones para los desplegables ajustables (canas / tono de piel).
// Son opcionales: si el cliente deja el valor por defecto, no cambian nada.
app.get("/api/options", (req, res) => {
  res.json({ canas: CANAS_OPTIONS, fototipos: FOTOTIPO_OPTIONS });
});

app.post("/api/simulate", async (req, res) => {
  try {
    const { imageBase64, mimeType, caseValue, canas, fototipo } = req.body || {};

    if (!imageBase64 || !mimeType || !caseValue) {
      return res.status(400).json({ error: "Faltan datos: imagen, tipo de imagen o tipo de caso." });
    }

    const selectedCase = CASES.find((c) => c.value === caseValue);
    if (!selectedCase) {
      return res.status(400).json({ error: "Tipo de caso no reconocido." });
    }

    // Anade al prompt base las coletillas de canas/tono de piel, si se han elegido.
    const extras = [];
    if (canas && CANAS_TEXT[canas]) extras.push(CANAS_TEXT[canas]);
    if (fototipo && FOTOTIPO_TEXT[fototipo]) extras.push(FOTOTIPO_TEXT[fototipo]);
    const finalPrompt = extras.length
      ? `${selectedCase.prompt}\n\n${extras.join(" ")}`
      : selectedCase.prompt;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        { text: finalPrompt },
        { inlineData: { mimeType, data: imageBase64 } }
      ],
      // Pide la resolucion mas alta razonable (por defecto el modelo genera
      // a 1K). A mas resolucion, mas detalle de textura/foliculo - relevante
      // para que la simulacion se vea nitida y no "borrosa". Coste extra
      // minimo (unos 3-4 centimos mas por imagen).
      config: {
        imageConfig: {
          imageSize: "2K"
        }
      }
    });

    const parts = response?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart) {
      console.error("Respuesta sin imagen:", JSON.stringify(response).slice(0, 500));
      return res.status(502).json({ error: "El modelo no devolvio una imagen. Prueba de nuevo." });
    }

    logUsage(req.clinic, selectedCase.label).catch((err) =>
      console.error("Error registrando uso en la hoja:", err.message)
    );

    res.json({
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType || "image/png"
    });
  } catch (err) {
    console.error("Error generando la simulacion:", err);
    res.status(500).json({ error: "Error generando la simulacion. Revisa el servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Simulador PTC escuchando en el puerto ${PORT}`);
});
