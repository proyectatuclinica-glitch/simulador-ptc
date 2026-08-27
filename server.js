// ============================================================
// SIMULADOR ANTES/DESPUES - Proyecta tu Clinica
// ------------------------------------------------------------
// Herramienta interna para que el cliente (clinica) la use en
// consulta, delante del paciente. No hay CRM, ni tags, ni capas
// intermedias: entra, sube foto, genera, ensena el resultado.
//
// Acceso protegido con usuario/contrasena (Basic Auth nativo del
// navegador) definidos en las variables de entorno.
// ============================================================

require("dotenv").config();
const express = require("express");
const basicAuth = require("basic-auth");
const { GoogleGenAI } = require("@google/genai");
const { CASES, CANAS_OPTIONS, CANAS_TEXT, FOTOTIPO_OPTIONS, FOTOTIPO_TEXT } = require("./prompts");

const app = express();
const PORT = process.env.PORT || 3000;

// Limite generoso para admitir fotos moviles en base64 (~10-12MB tipico)
app.use(express.json({ limit: "20mb" }));

// ---- Acceso: usuario/contrasena unico para tu cliente ----
function requireAuth(req, res, next) {
  const creds = basicAuth(req);
  const user = process.env.ACCESS_USER || "clinica";
  const pass = process.env.ACCESS_PASSWORD;

  if (!pass) {
    // Si no se ha configurado contrasena, no arrancamos "abiertos" por error.
    return res.status(500).send("Falta configurar ACCESS_PASSWORD en las variables de entorno.");
  }
  if (!creds || creds.name !== user || creds.pass !== pass) {
    res.set("WWW-Authenticate", 'Basic realm="Simulador PTC"');
    return res.status(401).send("Acceso restringido.");
  }
  next();
}

app.use(requireAuth);
app.use(express.static("public"));

// ---- Cliente Gemini ----
// Lee la API key automaticamente de la variable de entorno GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-3.1-flash-image";

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
