export type TestQuestion = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

export const topics = ["Constitución Española", "Derecho Penal", "Extranjería", "Ortografía", "Psicotécnicos"];

export const sampleQuestions: Record<string, TestQuestion[]> = {
  "Constitución Española": [
    {
      question: "¿Qué valores superiores proclama el artículo 1.1 de la Constitución Española?",
      options: [
        "Unidad, autonomía, solidaridad y justicia.",
        "Libertad, justicia, igualdad y pluralismo político.",
        "Legalidad, jerarquía normativa, publicidad y seguridad jurídica.",
        "Igualdad, mérito, capacidad y publicidad.",
      ],
      correct: "B",
      explanation: "El artículo 1.1 recoge libertad, justicia, igualdad y pluralismo político. La opción C mezcla principios del artículo 9.3.",
    },
    {
      question: "¿Dónde reside la soberanía nacional según la Constitución?",
      options: ["En las Cortes Generales.", "En el Rey.", "En el pueblo español.", "En el Gobierno."],
      correct: "C",
      explanation: "El artículo 1.2 establece que la soberanía nacional reside en el pueblo español.",
    },
    {
      question: "¿Cuál es la forma política del Estado español?",
      options: ["República parlamentaria.", "Monarquía constitucional federal.", "Monarquía parlamentaria.", "Estado autonómico presidencialista."],
      correct: "C",
      explanation: "El artículo 1.3 establece que la forma política del Estado español es la Monarquía parlamentaria.",
    },
  ],
  "Derecho Penal": [
    {
      question: "En términos generales, ¿qué caracteriza al dolo eventual?",
      options: [
        "El autor quiere directamente el resultado como fin principal.",
        "El autor prevé el resultado como posible y aun así continúa aceptando el riesgo.",
        "El autor actúa sin ninguna representación del resultado.",
        "El autor actúa siempre por error invencible.",
      ],
      correct: "B",
      explanation: "En el dolo eventual el sujeto no busca necesariamente el resultado, pero lo asume como posible y continúa actuando.",
    },
    {
      question: "¿Cuándo puede hablarse de tentativa de forma general?",
      options: [
        "Cuando solo existe una idea interna no exteriorizada.",
        "Cuando se inicia la ejecución del delito pero no se consuma por causas ajenas a la voluntad del autor.",
        "Cuando el delito se consuma completamente.",
        "Cuando la conducta es siempre imprudente.",
      ],
      correct: "B",
      explanation: "La tentativa exige inicio de ejecución y falta de consumación por causas independientes de la voluntad del autor.",
    },
    {
      question: "¿Qué diferencia básica hay entre dolo e imprudencia?",
      options: [
        "En el dolo hay voluntad o aceptación del resultado; en la imprudencia falta el cuidado debido.",
        "La imprudencia siempre implica intención directa.",
        "El dolo solo existe en infracciones administrativas.",
        "No existe diferencia jurídica relevante.",
      ],
      correct: "A",
      explanation: "El dolo se relaciona con querer o aceptar el resultado; la imprudencia con infringir el deber de cuidado.",
    },
  ],
  Extranjería: [
    {
      question: "¿Cuál es la diferencia general entre estancia y residencia?",
      options: [
        "La estancia es permanencia temporal; la residencia implica autorización para vivir en España durante un periodo más estable.",
        "La residencia solo puede durar 24 horas.",
        "La estancia equivale siempre a nacionalidad española.",
        "No existe diferencia entre ambas figuras.",
      ],
      correct: "A",
      explanation: "De forma general, la estancia es permanencia temporal y la residencia supone una autorización de permanencia más estable.",
    },
    {
      question: "¿Qué debe hacer OpoCompi si una pregunta depende de normativa de extranjería vigente?",
      options: [
        "Inventar el artículo más probable.",
        "Responder con cautela y recomendar verificar fuente oficial actualizada.",
        "Citar academias como fuente definitiva.",
        "Evitar siempre responder cualquier concepto.",
      ],
      correct: "B",
      explanation: "Extranjería cambia y exige prudencia: BOE y fuentes oficiales recientes tienen prioridad.",
    },
    {
      question: "¿Qué enfoque es más seguro al estudiar extranjería para oposición?",
      options: [
        "Memorizar esquemas antiguos sin comprobar fecha.",
        "Priorizar conceptos base y contrastar artículos o procedimientos con normativa vigente.",
        "Estudiar solo casos prácticos sin teoría.",
        "No hacer tests porque la materia cambia.",
      ],
      correct: "B",
      explanation: "La base conceptual ayuda, pero los detalles normativos deben contrastarse con fuente oficial actualizada.",
    },
  ],
  Ortografía: [
    {
      question: "Elige la forma correcta.",
      options: ["Preveer.", "Prever.", "Prevéer.", "Preveher."],
      correct: "B",
      explanation: "La forma correcta es prever. 'Preveer' es una forma incorrecta muy habitual.",
    },
    {
      question: "¿Cuándo llevan tilde los monosílabos?",
      options: [
        "Siempre.",
        "Nunca, salvo casos de tilde diacrítica.",
        "Solo si terminan en vocal.",
        "Solo si son verbos.",
      ],
      correct: "B",
      explanation: "Los monosílabos no se tildan por regla general, salvo casos de tilde diacrítica como tú/tu, él/el o sí/si.",
    },
    {
      question: "Identifica la palabra mal escrita.",
      options: ["Exorbitante.", "Exuberante.", "Exhuberante.", "Exhaustivo."],
      correct: "C",
      explanation: "La forma correcta es exuberante, sin h intercalada.",
    },
  ],
  Psicotécnicos: [
    {
      question: "Completa la serie: 3, 6, 12, 24, ...",
      options: ["30.", "36.", "42.", "48."],
      correct: "D",
      explanation: "Cada término se multiplica por 2: 3, 6, 12, 24, 48.",
    },
    {
      question: "Si todos los A son B y algunos B son C, ¿qué conclusión es segura?",
      options: [
        "Todos los A son C.",
        "Algunos C son A necesariamente.",
        "Todos los A son B.",
        "Ningún B es C.",
      ],
      correct: "C",
      explanation: "La única conclusión segura es la premisa dada: todos los A son B. No se puede asegurar relación entre A y C.",
    },
    {
      question: "Serie alfabética: A, C, F, J, O, ...",
      options: ["S.", "T.", "U.", "V."],
      correct: "C",
      explanation: "Los saltos son +2, +3, +4, +5; el siguiente salto es +6. O + 6 = U.",
    },
  ],
};
