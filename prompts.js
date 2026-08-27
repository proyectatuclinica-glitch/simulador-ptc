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
    prompt: `MANTÉN LA INTEGRIDAD TOTAL DE LA FOTO ORIGINAL
Conserva INALTERABLES la postura, ángulo de la cabeza, perspectiva, proporciones, facciones, expresión, piel del rostro, barba, cejas, iluminación, sombras, fondo, encuadre, exposición, balance de blancos y tono general de la fotografía.
MODIFICA EXCLUSIVAMENTE la zona de pérdida capilar: entradas, línea frontal y coronilla. No alteres ninguna otra zona de la imagen.
No cambies la estructura facial ni la forma de la cabeza. No añadas cabello realista ni mechones de pelo. El resultado debe representar EXCLUSIVAMENTE una micropigmentación capilar con efecto de cabello rapado muy corto.

MICROPIGMENTACIÓN — EFECTO FOLÍCULO REAL
Aplica una micropigmentación capilar técnica y fotorrealista, simulando folículos de cabello extremadamente corto.
Los puntos de pigmento deben tener apariencia de MICRO-DOT MUY SUTIL, pequeños, individualizados y físicamente integrados en la superficie de la piel.
Cada folículo debe presentar pequeñas variaciones naturales en: tamaño, forma, intensidad, separación, orientación, concentración.
EVITA cualquier patrón repetitivo, uniforme o perfectamente alineado.
Los pigmentos deben respetar completamente la textura natural del cuero cabelludo y la dispersión real de la luz sobre la piel.
La piel debe permanecer visible entre los folículos en todo momento.
Utiliza exclusivamente tonos grisáceos, suaves, neutros y ligeramente desaturados, adaptados al tono existente del cuero cabelludo.
NO utilizar negro puro. NO utilizar pigmentación excesivamente oscura. NO crear masas sólidas de pigmento. NO modificar el tono general de la piel.
La densidad general debe ser MEDIA y natural, nunca excesiva.

LÍNEA FRONTAL — ULTRA DIFUMINADA / SOFT FEATHERED HAIRLINE
La línea frontal es el elemento MÁS IMPORTANTE del resultado.
Debe ser MUCHO MÁS DIFUMINADA, suave e irregular que definida.
Debe reproducir el aspecto de una línea frontal masculina natural con cabello rapado extremadamente corto, donde los primeros folículos se pierden progresivamente sobre la piel.
REGLA PRINCIPAL: NO DEBE EXISTIR UNA LÍNEA FRONTAL CLARAMENTE IDENTIFICABLE.
El observador NO debe poder señalar un punto exacto y decir: "aquí empieza la micropigmentación".
La transición entre piel limpia y pigmentación debe ser AMPLIA, GRADUAL, DIFUSA Y ORGÁNICA.

GRADIENTE DE DENSIDAD
Crear un gradiente progresivo de densidad desde la piel hacia el interior: PIEL LIMPIA → MICRO-DOTS CASI INVISIBLES → MICRO-DOTS MUY DISPERSOS → DENSIDAD BAJA → DENSIDAD MEDIA → DENSIDAD NATURAL INTERIOR.
La transición debe extenderse suficientemente hacia atrás para evitar cualquier efecto de borde.
NO concentrar el pigmento justo en la primera línea. NO crear un salto repentino entre piel limpia y pigmentación. NO utilizar una primera fila de puntos perfectamente definida.
La densidad debe aumentar de manera CONTINUA y PROGRESIVA, sin escalones visibles.

PRIMERA ZONA DE TRANSICIÓN
Los primeros micro-puntos próximos a la frente deben ser: extremadamente pequeños, muy claros, de baja opacidad visual, muy separados entre sí, irregulares, asimétricos, parcialmente imperceptibles, distribuidos de forma aleatoria y orgánica.
Los primeros puntos deben parecer folículos aislados que comienzan a aparecer naturalmente sobre la piel, NO una línea de pigmento.
Debe existir una cantidad considerable de piel visible entre ellos.
Algunos micro-puntos pueden ser tan sutiles que prácticamente se pierdan con la iluminación natural.

AUSENCIA DE BORDE
La hairline debe tener un EDGELESS TRANSITION.
No debe existir: borde definido, contorno, línea recta, línea continua, arco perfectamente uniforme, esquina marcada, cambio brusco de densidad, primera fila perfectamente alineada, delimitación geométrica.
La zona frontal debe desvanecerse progresivamente hasta confundirse con la textura natural de la piel.
NO dibujar la hairline. NO delinear la hairline. NO rellenar inmediatamente detrás de la frente. NO crear una "línea de implantación" visible.

IRREGULARIDAD NATURAL
La línea frontal debe presentar pequeñas irregularidades microscópicas y asimetrías naturales.
La distribución de los folículos debe variar ligeramente de una zona a otra.
Crear pequeñas zonas donde la densidad sea ligeramente mayor y otras donde sea ligeramente menor.
Evitar cualquier sensación de simetría artificial.
Las entradas deben integrarse mediante el mismo gradiente progresivo.
NO crear esquinas pronunciadas en las entradas. NO crear una forma de "M" perfectamente dibujada. NO hacer que ambas entradas sean idénticas.
La irregularidad debe ser SUTIL y REALISTA, no exagerada.

CORONILLA Y ZONAS DE PÉRDIDA
Aplicar el mismo principio de integración progresiva en la coronilla.
La densidad debe adaptarse gradualmente a las zonas donde existe cabello o sombra natural.
No crear una zona circular perfectamente definida. No crear un bloque uniforme de pigmentación.
La transición entre cuero cabelludo visible y zona pigmentada debe mantenerse natural y progresiva.

PROFUNDIDAD Y OPACIDAD DEL PIGMENTO
El pigmento debe parecer situado visualmente dentro de la textura del cuero cabelludo, no colocado encima de la piel.
Debe existir sensación de profundidad y dispersión natural.
Los micro-dots deben integrarse con: poros, textura cutánea, pequeñas irregularidades de la piel, sombras naturales, reflejos naturales, variaciones tonales del cuero cabelludo.
Reducir la intensidad visual de los puntos conforme se aproximan a la línea frontal.
Frontal = menor intensidad + menor densidad + mayor separación.
Interior = mayor densidad + mayor consistencia + intensidad ligeramente superior.

NEGATIVE PROMPT — EVITAR ABSOLUTAMENTE
ELIMINAR CUALQUIER APARIENCIA DE: tatuaje capilar marcado, tinta superficial, maquillaje, línea dibujada, hairline geométrica, hairline recta, borde sólido, borde oscuro, pigmentación negra, puntos grandes, puntos perfectamente redondos y uniformes, sombreado uniforme, bloques de pigmento, patrón repetitivo, patrón perfectamente simétrico, primera fila de puntos definida, transición brusca, efecto de casco, efecto de cabello pintado, efecto de rotulador, efecto de "línea recién dibujada", contraste excesivo, cuero cabelludo artificialmente oscurecido.

REALISMO FOTOGRÁFICO
El resultado final debe parecer una FOTOGRAFÍA REAL DE UNA MICROPIGMENTACIÓN CAPILAR PROFESIONAL, no una edición digital.
Mantener exactamente la iluminación original de la fotografía.
No modificar exposición, contraste global, temperatura de color ni sombras originales.
Conservar la textura porosa y natural del cuero cabelludo.
Los micro-puntos deben reaccionar visualmente a la iluminación existente de la fotografía.
La micropigmentación debe ser visible únicamente al observarla con atención.
A primera vista, debe parecer simplemente un cuero cabelludo con folículos de cabello muy corto.

PRIORIDAD ABSOLUTA:
NATURALIDAD > DENSIDAD
DIFUMINACIÓN > DEFINICIÓN
IRREGULARIDAD NATURAL > SIMETRÍA
INTEGRACIÓN CON LA PIEL > CONTRASTE
GRADIENTE PROGRESIVO > BORDE VISIBLE

La línea frontal debe desaparecer progresivamente sobre la piel, sin un inicio claramente identificable.`
  },
  {
    value: "smp_efecto_rapado_urbano",
    label: "Efecto rapado - Urbano",
    prompt: `CONSERVA LA FOTOGRAFÍA ORIGINAL CASI POR COMPLETO.
Mantén exactamente la postura, ángulo, perspectiva, rostro, facciones, expresión, barba, edad, ropa, fondo, encuadre, iluminación, exposición, sombras, color y tono de piel.
MODIFICA ÚNICAMENTE EL CUERO CABELLUDO. No retoques ninguna otra zona.
El objetivo es añadir una micropigmentación capilar extremadamente sutil y fotorrealista, simulando cabello rapado a una longitud mínima.
La micropigmentación debe parecer parte de la piel original de la fotografía, no una capa añadida posteriormente.

ESCALA DE LOS FOLÍCULOS — PRIORIDAD MÁXIMA
Los folículos deben ser MICROSCÓPICOS, ULTRAFINOS Y MUCHO MÁS PEQUEÑOS DE LO QUE EL MODELO CONSIDERARÍA UN PUNTO NORMAL.
Cada folículo debe parecer un diminuto poro o sombra folicular.
NO generar círculos claramente visibles. NO generar puntos grandes. NO aumentar el tamaño de los puntos para conseguir más densidad.
La densidad debe percibirse por la acumulación natural de una gran cantidad de folículos diminutos.
Los microfolículos deben ser tan pequeños que, a distancia normal, se perciban principalmente como una textura natural de cabello rapado y no como puntos individuales.
Al ampliar la imagen deben seguir pareciendo pequeños folículos reales, nunca círculos de pigmento.

INTEGRACIÓN TOTAL
La micropigmentación debe comportarse como una TEXTURA CONTINUA DEL CUERO CABELLUDO.
No debe parecer que existen una zona "tratada" y otra "sin tratar".
La transición de densidad debe ser extremadamente gradual.
NO crear límites visuales entre zonas. NO crear cambios bruscos de tono. NO crear bandas de densidad. NO crear zonas con diferente acabado.
El cuero cabelludo completo debe conservar exactamente la misma textura, iluminación y apariencia de piel que la fotografía original.
La micropigmentación simplemente debe añadir pequeños folículos visualmente integrados.

MUY IMPORTANTE — NO CREAR NINGUNA LÍNEA EN EL CENTRO DEL CUERO CABELLUDO
NO debe aparecer ninguna línea, franja, banda, arco o cambio visible de superficie en la parte superior o central de la cabeza.
La densidad debe mantenerse continua desde la zona frontal hacia la zona superior y la coronilla.
No debe existir ningún punto concreto donde la pigmentación cambie bruscamente.
La parte superior debe verse como una continuación natural de la misma textura folicular.
No crear: línea horizontal, línea semicircular, segunda hairline, banda oscura, halo, zona de separación, borde posterior, línea de transición, cambio repentino de densidad, cambio repentino de color, cambio de textura.
LA ÚNICA TRANSICIÓN VISIBLE DEBE SER LA DEL BORDE FRONTAL NATURAL. El resto del cuero cabelludo debe permanecer visualmente continuo.

HAIRLINE — URBANA, PERO MUY NATURAL
La línea frontal debe tener una estética ligeramente más definida, propia de una barbería urbana.
Sin embargo, debe seguir pareciendo una hairline natural de cabello extremadamente corto.
La definición debe producirse únicamente porque existe una ligera mayor concentración de microfolículos diminutos en la zona frontal.
No crear una línea dibujada. No crear un contorno. No crear una franja oscura. No crear una fila de puntos.
La hairline debe estar formada por microfolículos individuales, nunca por una línea de pigmento.
Debe existir una pequeña transición soft-feathered en el borde frontal.
Los primeros folículos deben ser ligeramente más dispersos y suaves.
La densidad aumenta de manera imperceptible hacia el interior.

HAIRLINE NATURAL — NO PERFECTA
La línea frontal debe presentar pequeñas irregularidades naturales: ligeras diferencias de altura, separación y densidad, pequeñas asimetrías, variaciones microscópicas. Pero sin exagerar las irregularidades.
NO hacerla perfectamente recta. NO hacerla perfectamente simétrica. NO hacerla deliberadamente dentada.
Debe parecer una hairline masculina real, simplemente muy corta y bien cuidada.

ENTRADAS Y SIENES
Las entradas pueden estar ligeramente estructuradas, pero deben perder densidad progresivamente hacia la piel.
No crear esquinas duras. No crear una "M" geométrica. No crear ángulos artificiales.
Las sienes deben integrarse mediante la misma textura microscópica que el resto del tratamiento.

DENSIDAD
Utilizar una densidad MEDIA, ligeramente superior a la apariencia natural del cuero cabelludo, pero sin saturarlo.
Priorizar naturalidad sobre densidad. Debe seguir viéndose el tono natural de la piel entre los folículos.
No crear una superficie gris. No crear sombreado. No rellenar áreas completas. No utilizar grandes cantidades de pigmento.
La sensación de mayor densidad debe producirse únicamente mediante microfolículos muy pequeños y numerosos.

COLOR
Utilizar tonos grisáceos neutros, suaves y desaturados. Adaptar el pigmento exactamente al tono del cuero cabelludo existente.
El pigmento debe ser sutil y ligeramente translúcido.
NUNCA utilizar negro puro. No aumentar artificialmente el contraste del cuero cabelludo. No oscurecer globalmente la piel.

TEXTURA Y LUZ
Conservar completamente los poros, textura, pequeñas imperfecciones y variaciones naturales de la piel.
No aplicar suavizado. No aplicar blur. No eliminar poros. No modificar la iluminación. No modificar las sombras. No modificar la exposición.
Los microfolículos deben integrarse físicamente en la textura existente y reaccionar exactamente igual que la piel a la luz de la fotografía.

EVITAR ABSOLUTAMENTE
NO generar: puntos grandes, círculos visibles, puntos negros, tinta, tatuaje, maquillaje, rotulador, sombreado, bloques de pigmento, superficie gris uniforme, línea en mitad de la cabeza, línea secundaria, banda de pigmentación, halo, cambio brusco de densidad, cambio brusco de color, borde posterior, separación entre zonas, hairline dibujada, hairline sólida, hairline geométrica, hairline excesivamente perfecta, patrón repetitivo, puntos perfectamente alineados, efecto artificial, efecto CGI, piel suavizada digitalmente.

PRIORIDAD DE INTERPRETACIÓN
Si alguna instrucción entra en conflicto con otra, priorizar SIEMPRE en este orden:
1. FOTOREALISMO
2. INTEGRACIÓN CON LA PIEL
3. MICROFOLÍCULOS EXTREMADAMENTE PEQUEÑOS
4. CONTINUIDAD HOMOGÉNEA DEL CUERO CABELLUDO
5. NATURALIDAD
6. DEFINICIÓN URBANA DE LA HAIRLINE
7. DENSIDAD
Nunca sacrificar naturalidad para aumentar la definición o la densidad.

El resultado final debe parecer una fotografía real de un hombre con el cabello rapado extremadamente corto y una micropigmentación capilar urbana muy bien realizada, donde los folículos están tan perfectamente integrados que no parece posible distinguir una zona editada de la piel original.
NO DEBE PARECER UNA CAPA DE PIGMENTO. NO DEBE PARECER UNA LÍNEA. NO DEBEN VERSE PUNTOS GRANDES.
Debe parecer simplemente cuero cabelludo real con folículos de cabello extremadamente corto.`
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
