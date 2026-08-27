// ============================================================
// PROMPTS DE SIMULACION
// ------------------------------------------------------------
// Aqui van los prompts que ya has probado y validado en Google
// AI Studio. Sustituye el texto de ejemplo por los tuyos.
//
// Cada entrada es un "caso" que aparece como opcion en el
// selector de la web (public/index.html). El "value" es el
// identificador interno, el "label" es lo que ve tu cliente.
//
// Para anadir un caso nuevo (ej. otro tratamiento, otra clinica),
// simplemente anade otro objeto al array. No hace falta tocar
// nada mas del codigo.
//
// IMPORTANTE sobre los dos casos nuevos (cicatrices y microblading):
// a diferencia de "efecto rapado" y "densidad", estos dos NO estan
// validados todavia. Antes de usarlos delante de un paciente,
// pruebalos primero en Google AI Studio con fotos reales, igual que
// hiciste con los de SMP - son tareas visuales distintas (piel con
// cicatriz vs. cejas) y el resultado puede no ser fiable a la primera.
// ============================================================

module.exports = [
  {
    value: "smp_efecto_rapado",
    label: "Efecto rapado",
    prompt: `PEGA AQUI TU PROMPT VALIDADO PARA "EFECTO RAPADO".
Recuerda incluir instrucciones para mantener intacto el rostro, tono
de piel y fondo, y modificar solo la zona del cuero cabelludo con el
patron de micropuntos de la micropigmentacion capilar.`
  },
  {
    value: "smp_densidad",
    label: "Densidad",
    prompt: `PEGA AQUI TU PROMPT VALIDADO PARA "DENSIDAD".
Recuerda incluir instrucciones para mantener intacto el rostro, tono
de piel y fondo, y modificar solo las zonas de menor densidad
capilar, sin tocar el resto de la cabeza.`
  },
  {
    value: "smp_cicatrices",
    label: "Cicatrices",
    prompt: `PENDIENTE DE VALIDAR EN AI STUDIO ANTES DE USAR EN CONSULTA.
Prompt de partida para "cobertura de cicatrices" con SMP: edita
unicamente la zona de la cicatriz visible en el cuero cabelludo,
camuflandola con el mismo patron de micropuntos de la micropigmentacion
capilar usado en el resto de la zona rapada/donante, igualando el tono
de pigmento al pelo natural circundante. Mantén intactos el rostro, el
tono de piel, el resto del cuero cabelludo y el fondo de la imagen. No
alterar la forma de la cicatriz, solo camuflarla visualmente.`
  },
  {
    value: "microblading",
    label: "Microblading (cejas)",
    prompt: `PENDIENTE DE VALIDAR EN AI STUDIO ANTES DE USAR EN CONSULTA.
Prompt de partida para microblading de cejas: edita unicamente la zona
de las cejas, anadiendo trazos finos tipo pelo (efecto microblading)
para rellenar huecos y definir el arco natural de la ceja, respetando
la direccion de crecimiento del vello existente y el color de pelo de
la persona. Mantén intactos el resto del rostro, la piel, los ojos y
el fondo de la imagen. Nota: para este caso la foto debe ser un primer
plano de las cejas, no de la cabeza completa.`
  }
];
