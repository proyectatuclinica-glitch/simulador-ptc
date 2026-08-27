// ============================================================
// PROMPTS DE SIMULACION
// ------------------------------------------------------------
// Prompts validados por David en Google AI Studio para el
// simulador de micropigmentacion capilar (SMP).
//
// Cada entrada de CASES es un "caso" que aparece como opcion en
// el selector de la web (public/index.html). El "value" es el
// identificador interno, el "label" es lo que ve tu cliente.
//
// Para anadir un caso nuevo (ej. otro tratamiento, otra clinica),
// simplemente anade otro objeto al array CASES. No hace falta
// tocar nada mas del codigo, el selector de la web se genera solo.
//
// "Microblading" se ha quitado de la lista (28/08): confirmado
// que no es un caso adecuado para este tipo de simulacion visual
// antes/despues. Si en el futuro se quiere retomar, se anadiria
// aqui igual que los demas casos, con su prompt ya validado.
//
// CANAS_OPTIONS / FOTOTIPO_OPTIONS: los dos desplegables opcionales
// que aparecen en la web para ajustar el resultado segun el
// paciente (si tiene canas, y su tono de piel). Si el usuario deja
// la opcion por defecto ("Sin canas" / "No especificar"), no se
// anade nada al prompt. Si elige una opcion, el texto de
// CANAS_TEXT / FOTOTIPO_TEXT correspondiente se anade al final del
// prompt del caso antes de mandarlo a Gemini (ver server.js).
//
// Para ajustar el texto exacto de estas coletillas, o anadir mas
// opciones (ej. mas matices de fototipo), edita las listas y los
// objetos de texto de aqui abajo - no hace falta tocar server.js
// ni index.html.
// ============================================================

const CASES = [
  {
    value: "smp_efecto_rapado_natural",
    label: "Efecto rapado - Natural",
    prompt: `MANTÉN LA INTEGRIDAD TOTAL DE LA FOTO ORIGINAL: Conserva inalterables la postura, ángulo, iluminación del rostro, fondo, facciones y barba. Modifica EXCLUSIVAMENTE la zona de la calvicie (entradas y coronilla). Aplica una micropigmentación capilar técnica con efecto rapado natural (folículo densidad media). Los puntos de pigmento deben tener una apariencia de 'micro-dot' sutil, respetando la textura natural del cuero cabelludo y la dispersión de luz real sobre la piel. EVITA contrastes extremos o negros puros; utiliza tonos grisáceos suaves que se integren con el tono de piel existente. La línea frontal (hairline) debe ser imperceptiblemente irregular, con un efecto de degradado (soft-feathered), evitando bordes rectos o definidos. El resultado debe simular un cuero cabelludo con folículos reales bajo luz natural, eliminando cualquier rastro de efecto artificial o 'tatuaje marcado'. Acabado fotorrealista clínico, manteniendo la textura porosa de la piel.`
  },
  {
    value: "smp_efecto_rapado_urbano",
    label: "Efecto rapado - Urbano",
    prompt: `MANTÉN EXACTAMENTE LA MISMA FOTO ORIGINAL: No alteres la postura de la cabeza, ni la inclinación, ni la dirección de la mirada, ni el fondo. Conserva pixel por pixel el rostro, las facciones, la barba, la edad y la ropa del paciente original. Modifica EXCLUSIVAMENTE el área del cuero cabelludo. Aplica una micropigmentación capilar hiperrealista con un estilo urbano de alta densidad. Diseña una línea frontal del cabello recta, ultra marcada, simétrica y nítida (sharp edge-up hairline / estilo colombiano), con ángulos limpios y perfectamente definidos en las sienes. Los folículos simulados deben verse oscuros, densos y compactos, con un contraste evidente que delimite la línea de forma impecable, simulando un corte de barbería recién perfilado con cuchilla. Acabado fotorrealista de alta definición clínica.`
  },
  {
    value: "smp_densidad",
    label: "Densidad",
    prompt: `MANTÉN EXACTAMENTE LA MISMA FOTO ORIGINAL: No alteres la postura de la cabeza, ni la inclinación, ni la dirección de la mirada, ni el fondo. Conserva pixel por pixel el rostro, las facciones, la edad, la ropa, y sobre todo, MANTÉN IDÉNTICO EL PEINADO ORIGINAL, la longitud del cabello, el color del pelo y su colocación. Modifica EXCLUSIVAMENTE el cuero cabelludo visible que clarea entre los cabellos sueltos. Aplica un efecto de sombreado y densidad de alta visibilidad mediante micropigmentación capilar. Reduce drásticamente el contraste de la piel blanca del cuero cabelludo, simulando miles de folículos densos, oscuros y nítidos bajo el pelo largo existente. El cambio debe ser totalmente perceptible, eliminando visualmente los clareos de la alopecia difusa y aportando un efecto inmediato de volumen y frondosidad. Resultado fotorrealista de alta definición clínica.`
  },
  {
    value: "smp_cicatrices",
    label: "Cicatrices",
    prompt: `MANTÉN EXACTAMENTE LA MISMA FOTO ORIGINAL: No alteres la perspectiva, ni el ángulo de la cámara, ni la postura de la cabeza, ni el fondo. Conserva pixel por pixel toda la estructura de la cabeza, el tipo de rapado, la longitud del cabello colindante, su color exacto y el tono de la piel de la imagen original. Modifica EXCLUSIVAMENTE la línea o zona de la cicatriz visible en el cuero cabelludo. Aplica un camuflaje de micropigmentación capilar hiperrealista de alta visibilidad. Integra folículos simulados perfectamente perceptibles, nítidos y texturizados directamente sobre el tejido cicatrizal, igualando de forma idéntica la densidad, el patrón de crecimiento y el tono oscuro del pelo de alrededor. La cicatriz debe quedar 100% cubierta y totalmente invisible a la vista, logrando una transición limpia e imperceptible con el resto de la cabeza. Fotografía macro de alta definición médica.`
  }
];

// ---- Desplegable "Canas" (opcional) ----
const CANAS_OPTIONS = [
  { value: "", label: "Sin canas" },
  { value: "pocas", label: "Algunas canas" },
  { value: "muchas", label: "Canas abundantes" }
];

const CANAS_TEXT = {
  pocas: "Añade aproximadamente un 10% de folículos grisáceos para simular algunas canas naturales.",
  muchas: "Añade aproximadamente un 25% de folículos grisáceos para simular canas abundantes."
};

// ---- Desplegable "Tono de piel" (opcional) ----
const FOTOTIPO_OPTIONS = [
  { value: "", label: "No especificar" },
  { value: "claro", label: "Piel clara" },
  { value: "medio", label: "Piel media / trigueña" },
  { value: "oliva", label: "Piel mulata / oliva" },
  { value: "oscuro", label: "Piel muy oscura" }
];

const FOTOTIPO_TEXT = {
  claro: "Usa un pigmento marrón claro adaptado a un fototipo de piel clara.",
  medio: "Usa un pigmento marrón medio adaptado a un fototipo de piel media/trigueña.",
  oliva: "Usa un pigmento marrón oscuro adaptado a un fototipo de piel mulata/oliva.",
  oscuro: "Usa un pigmento muy oscuro adaptado a un fototipo de piel muy oscura."
};

module.exports = {
  CASES,
  CANAS_OPTIONS,
  CANAS_TEXT,
  FOTOTIPO_OPTIONS,
  FOTOTIPO_TEXT
};
