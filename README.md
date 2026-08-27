# Simulador antes/despues - Proyecta tu Clinica

Herramienta interna de una sola pagina. Tu cliente entra, sube una foto,
elige el tipo de caso y genera la simulacion en pantalla. Sin CRM, sin
etiquetas, sin capas: solo la web.

## 0. Tu logo y color de marca

- Logo: guarda tu logo (fondo transparente, formato PNG, ideal ancho
  ~400px) dentro de la carpeta `public` con el nombre exacto `logo.png`,
  sustituyendo... bueno, ahora mismo no hay ninguno, asi que solo tienes
  que anadirlo ahi. Si no lo anades, la pagina muestra automaticamente
  el nombre "Proyecta tu Clinica" en su lugar, no se rompe nada.
- Color de marca: abre `public/index.html`, busca casi al principio
  las lineas `--brand-1` y `--brand-2` (dentro de `:root { ... }`) y
  cambia esos dos codigos de color por los tuyos. Todo el diseño
  (boton, brillo de fondo, segmentado, slider) se adapta solo.

## 1. Antes de nada: pega tus prompts

Abre `prompts.js` y sustituye el texto de ejemplo por los prompts que ya
has validado en Google AI Studio (uno para "efecto rapado", otro para
"densidad"). Si quieres anadir un tipo de caso mas (otro tratamiento,
otra clinica), copia uno de los bloques y anade uno nuevo al array.

## 2. Consigue tu API key de Gemini

Entra en https://aistudio.google.com/apikey , crea una key gratuita
(tiene cuota gratuita mensual; si el volumen de uso crece, se factura por
imagen generada — revisa el precio actual en esa misma pagina antes de
escalarlo a mas clinicas).

## 3. Prueba en local (opcional, si tienes Node instalado)

```bash
npm install
cp .env.example .env
# Edita .env: pega tu GEMINI_API_KEY y pon una ACCESS_PASSWORD tuya
npm start
```

Abre http://localhost:3000 — el navegador te pedira el usuario/contrasena
que hayas puesto en `.env`.

## 4. Desplegar en Render (gratis, sin servidor propio)

1. Sube esta carpeta a un repositorio de GitHub (puede ser privado).
2. Entra en https://render.com , crea cuenta (puedes usar tu GitHub).
3. "New" -> "Web Service" -> conecta el repositorio.
4. Render detecta que es Node. Configuracion:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. En la pestana "Environment", anade estas variables (las mismas del
   `.env.example`):
   - `GEMINI_API_KEY`
   - `ACCESS_USER`
   - `ACCESS_PASSWORD`
6. Deploy. Render te da una URL tipo `simulador-ptc.onrender.com`.
7. (Opcional, mas adelante) Apunta un subdominio propio, por ejemplo
   `simulador.proyectatuclinica.com`, a esa URL con un registro CNAME
   desde el panel DNS de tu dominio.

Con el plan gratuito de Render el servicio "duerme" tras un rato de
inactividad y tarda unos segundos en despertar en la primera peticion
del dia — para uso puntual en consulta no suele ser un problema, pero
si molesta, el plan de pago mas basico lo mantiene siempre activo.

## 5. Dar acceso a tu cliente

Le pasas la URL + el usuario/contrasena que hayas puesto en
`ACCESS_USER` / `ACCESS_PASSWORD`. El navegador le pedira esas
credenciales la primera vez y las recordara. Si quieres revocarle el
acceso mas adelante, cambias la contrasena en Render y listo.

## Notas

- El modelo usado es `gemini-3.1-flash-image` (Nano Banana). Si Google
  publica una version nueva y quieres probarla, el unico cambio es la
  constante `MODEL` en `server.js`.
- El aviso "Simulacion orientativa generada por IA..." bajo el resultado
  esta ahi por proteccion legal/reputacional (reclamos de resultado en
  estetica son terreno sensible) - no lo quites, aunque sea discreto.
- Esto es una base minima a proposito. Si mas adelante lo conviertes en
  producto para varias clinicas (login por clinica, historial, etc.),
  esa es la siguiente capa - no la anadas hasta que la version simple
  haya demostrado que mejora el cierre en consulta.
