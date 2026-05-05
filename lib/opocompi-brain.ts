export const OPOCOMPI_SYSTEM_PROMPT = `
Eres OpoCompi, un preparador IA experto para opositores a Policía Nacional. También puedes ayudar con Guardia Civil y Policía Local, pero tu foco principal es Policía Nacional.

Rol y trato:
- Actúa como preparador experto en oposiciones a Policía Nacional.
- Trata siempre al usuario como "Compi", de forma natural, cercana y respetuosa.
- Habla como un compañero de oposición que domina el temario: acompañas, corriges, motivas y empujas a seguir.
- El usuario es opositor, no jurista experto: ajusta el nivel de dificultad sin perder rigor.
- Nunca prometas aprobados ni generes falsas garantías.

Rigor jurídico y fuentes:
- Explica siempre de forma clara, jurídica y adaptada al lenguaje de opositor.
- Usa legislación vigente y actualizada cuando esté disponible en el contexto proporcionado.
- No inventes normativa, artículos, requisitos, convocatorias, plazos ni datos oficiales.
- Si no tienes seguridad, dilo claramente y recomienda verificar BOE o fuente oficial.
- Da más veracidad al BOE reciente que a cualquier otro documento.
- Nunca menciones academias ni autores privados como fuente de autoridad.

Estilo de respuesta:
- Por defecto responde corto: 4 a 7 bloques breves como máximo.
- Evita párrafos largos. Ordena con listas, tablas o cuadros comparativos cuando sea útil.
- Usa emojis o símbolos con moderación: máximo 1 o 2 por respuesta y solo si aclaran.
- Si un artículo o concepto es complejo, desglósalo paso a paso.
- Añade ejemplos reales del ámbito policial cuando ayuden a comprender.
- Anticipa dudas frecuentes y resuélvelas con enfoque de test.
- Si el usuario pide desarrollo completo, entonces puedes extenderte.

Estructura recomendada para dudas:
1. Respuesta directa.
2. Explicación breve.
3. Clave de test o memorización.
4. Ejemplo policial si procede.
5. Bloque final "Lo que debes recordar".

Formato final habitual:
🔑 Lo que debes recordar:
- Punto clave 1.
- Punto clave 2.
- Punto clave 3.

Interactividad y práctica:
- Si el usuario lo pide, genera test tipo A/B/C/D con opciones concretas y verosímiles.
- No uses respuestas genéricas como opciones.
- Si pide "test para practicar", "sin respuestas" u "ocúltame las respuestas", no muestres la solución todavía.
- En ese caso, pide que conteste con formato "1B, 2D, 3A" y después corrige errores.
- Si pide "test corregido", incluye respuesta correcta, explicación y por qué fallan las demás.
- Sugiere de forma proactiva mini-cuestionarios, preguntas de arrastre de memoria, casos prácticos policiales o resúmenes esquemáticos.

Motivación y acompañamiento:
- Usa tono motivador, cercano y disciplinado.
- Refuerza avances con frases naturales como "Vas un paso más cerca de tu plaza" o "Este concepto ya lo tienes dominado, sigamos".
- Si corriges un fallo, hazlo con apoyo: "Bien visto, Compi, pero ojo con esta trampa de test".
- Ofrece consejos de estudio cuando detectes dudas generales: repaso activo, técnica de test, control del tiempo, memorización u organización semanal.

Llamada a la acción:
- Termina con una sola propuesta útil, no con varias a la vez.
- Ejemplos:
  "¿Quieres un test rápido sobre este tema?"
  "¿Prefieres un ejemplo aplicado a una actuación policial?"
  "Respóndeme con 1B, 2C... y te corrijo, Compi."
`.trim();

export const OPOCOMPI_KNOWLEDGE_CONTEXT = `
Base propia inicial de OpoCompi.

Producto:
- OpoCompi es un asistente IA para opositores a Policía Nacional.
- Resuelve dudas, genera tests, ayuda a repasar y acompaña la rutina de estudio.
- Prueba gratuita: 3 mensajes.
- Suscripción: 9,90 EUR mensual o 90,90 EUR anual.

Fuente prioritaria:
- BOE y fuentes oficiales recientes.
- Si hay conflicto entre documentos, dar más peso al BOE más reciente.
- Si el dato depende de convocatoria vigente, no cerrarlo como definitivo sin verificar fuente oficial.

Constitución Española:
- Fuente principal: BOE, Constitución Española, BOE-A-1978-31229.
- Última modificación indicada por BOE: 17 de febrero de 2024.
- Estructura: Preámbulo, Título Preliminar, Títulos I a X, disposiciones.
- Título Preliminar: artículos 1 a 9.
- Título I: derechos y deberes fundamentales, artículos 10 a 55.
- Título II: la Corona, artículos 56 a 65.
- Título III: Cortes Generales, artículos 66 a 96.
- Título IV: Gobierno y Administración, artículos 97 a 107.
- Título V: relaciones Gobierno-Cortes, artículos 108 a 116.
- Título VI: Poder Judicial, artículos 117 a 127.
- Título VII: Economía y Hacienda, artículos 128 a 136.
- Título VIII: organización territorial del Estado, artículos 137 a 158.
- Título IX: Tribunal Constitucional, artículos 159 a 165.
- Título X: reforma constitucional, artículos 166 a 169.

Constitución, puntos de test:
- Art. 1.1: España es un Estado social y democrático de Derecho.
- Art. 1.1: valores superiores: libertad, justicia, igualdad y pluralismo político.
- Art. 1.2: la soberanía nacional reside en el pueblo español.
- Art. 1.3: forma política del Estado: Monarquía parlamentaria.
- Art. 2: unidad de la Nación española, autonomía de nacionalidades y regiones, solidaridad.
- Art. 3: castellano como lengua española oficial del Estado; deber de conocerla y derecho a usarla.
- Art. 4: bandera roja, amarilla y roja; la amarilla de doble anchura.
- Art. 6: partidos políticos.
- Art. 7: sindicatos y asociaciones empresariales.
- Art. 8: Fuerzas Armadas.
- Art. 9.1: ciudadanos y poderes públicos sujetos a la Constitución y al resto del ordenamiento jurídico.
- Art. 9.3: legalidad, jerarquía normativa, publicidad de las normas, irretroactividad en los términos constitucionales, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad.
- Art. 10: dignidad de la persona, derechos inviolables, libre desarrollo de la personalidad, respeto a la ley y a los derechos de los demás.
- Art. 14: igualdad ante la ley.
- Arts. 15 a 29: derechos fundamentales y libertades públicas.
- Arts. 30 a 38: derechos y deberes de los ciudadanos.
- Arts. 39 a 52: principios rectores de la política social y económica.
- Arts. 53 y 54: garantías de derechos y Defensor del Pueblo.
- Art. 55: suspensión de derechos y libertades.

Claves de memorización:
- Valores superiores = art. 1.1.
- Soberanía nacional = pueblo español = art. 1.2.
- Monarquía parlamentaria = art. 1.3.
- Partidos políticos = art. 6.
- Sindicatos y asociaciones empresariales = art. 7.
- Fuerzas Armadas = art. 8.
- Igualdad = art. 14.
- Derechos fundamentales = arts. 15 a 29.
- Principios rectores = arts. 39 a 52.

Banco inicial de preguntas validadas:
1. Valores superiores: libertad, justicia, igualdad y pluralismo político.
2. Soberanía nacional: pueblo español.
3. Forma política del Estado: Monarquía parlamentaria.
4. Partidos políticos: artículo 6.
5. Derechos fundamentales y libertades públicas: artículos 15 a 29.

Derecho Penal, base prudente:
- Dolo directo: el autor quiere el resultado.
- Dolo eventual: el autor prevé el resultado como posible y continúa aceptando el riesgo.
- Imprudencia: infracción del deber de cuidado sin querer el resultado.
- Tentativa, de forma general: inicio de ejecución sin consumación por causas ajenas a la voluntad del autor.
- Si se piden artículos concretos o reformas recientes, responder con cautela y recomendar verificar Código Penal vigente en BOE.

Extranjería, base prudente:
- Materia cambiante y muy dependiente de normativa vigente.
- Distinguir en general estancia y residencia: estancia como permanencia temporal; residencia como autorización para vivir en España en términos más estables.
- Si se pregunta por procedimientos, plazos, autorizaciones o requisitos concretos, recomendar contraste con normativa y fuente oficial actualizada.

Seguridad Privada:
- Fuente normativa principal: Ley 5/2014, de 4 de abril, de Seguridad Privada, BOE-A-2014-3649.
- Entrada en vigor indicada por BOE: 5 de junio de 2014.
- Última actualización publicada indicada por BOE: 27 de mayo de 2021.
- Conexión constitucional: art. 104 CE, misión de las Fuerzas y Cuerpos de Seguridad; art. 149.1.29 CE, competencia exclusiva del Estado en seguridad pública.
- Modelo español: seguridad privada complementaria, subordinada, colaboradora y controlada por la seguridad pública.
- Art. 1: objeto de la Ley, actividades y servicios de seguridad privada, protección de personas y bienes e investigaciones privadas.
- Art. 2: definiciones básicas: seguridad privada, actividades, servicios, funciones, medidas, prestadores, empresa, personal, usuario y despacho de detectives.
- Art. 3: ámbito de aplicación: empresas, personal, despachos, servicios, medidas, contratos, usuarios y otros sujetos relacionados.
- Art. 4: fines: satisfacer necesidades legítimas de seguridad o información, contribuir a la seguridad pública, prevenir infracciones y aportar información.
- Art. 5: actividades: vigilancia y protección, protección de personas determinadas, depósito y custodia de objetos especiales, transporte, sistemas conectados, centrales de alarma e investigación privada.
- Art. 6: actividades compatibles o auxiliares, como ciertas tareas de control, recepción, consultoría o equipos no conectados, siempre que no impliquen funciones propias de seguridad privada.
- Clave de test: no confundir seguridad privada con seguridad pública ni tareas auxiliares con funciones propias de vigilantes o detectives.
`.trim();

function getModeInstructions(message: string, mode?: string) {
  const normalized = `${mode ?? ""} ${message}`.toLowerCase();
  const wantsPractice =
    normalized.includes("sin respuesta") ||
    normalized.includes("sin respuestas") ||
    normalized.includes("oculta") ||
    normalized.includes("ocultas") ||
    normalized.includes("practicar") ||
    normalized.includes("corrígeme") ||
    normalized.includes("corrigeme");

  if (normalized.includes("test") || mode === "test") {
    return wantsPractice
      ? "Modo test para practicar: crea preguntas A/B/C/D y NO muestres la respuesta correcta todavía. Pide que conteste con formato 1A, 2C, 3D."
      : "Modo test corregido: crea preguntas A/B/C/D con una respuesta correcta, explicación breve y por qué las otras opciones fallan.";
  }

  if (normalized.includes("ánimo") || normalized.includes("animo") || mode === "animo") {
    return "Modo ánimo: valida el esfuerzo, baja la carga mental y propone una tarea de estudio concreta de 10 a 25 minutos.";
  }

  if (normalized.includes("plan") || mode === "plan") {
    return "Modo plan: propone un bloque realista con estudio, test, corrección de errores y repaso activo.";
  }

  return "Modo dudas: responde claro, breve y con enfoque de test. Si procede, añade ejemplo policial y una pregunta corta para avanzar.";
}

export function buildOpoCompiInput(message: string, mode?: string) {
  return `
${getModeInstructions(message, mode)}

Contexto propio disponible:
${OPOCOMPI_KNOWLEDGE_CONTEXT}

Mensaje del opositor:
${message}
`.trim();
}
