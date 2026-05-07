export type TestQuestion = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

type TopicDefinition = {
  title: string;
  area: "Ciencias juridicas" | "Ciencias sociales" | "Materias tecnico-cientificas";
  focus: string[];
};

export const topicDefinitions = [
  {
    title: "Tema 1. El Derecho",
    area: "Ciencias juridicas",
    focus: ["normas juridicas positivas", "jerarquia normativa", "persona juridica", "nacionalidad espanola", "domicilio y vecindad civil"],
  },
  {
    title: "Tema 2. Constitucion Espanola I",
    area: "Ciencias juridicas",
    focus: ["estructura constitucional", "valores superiores", "derechos fundamentales", "garantias constitucionales", "Defensor del Pueblo"],
  },
  {
    title: "Tema 3. Constitucion Espanola II",
    area: "Ciencias juridicas",
    focus: ["Corona", "Cortes Generales", "Gobierno y Administracion", "Poder Judicial", "reforma constitucional"],
  },
  {
    title: "Tema 4. Union Europea",
    area: "Ciencias juridicas",
    focus: ["Derecho derivado", "instituciones europeas", "cooperacion policial internacional", "Tribunal Europeo de Derechos Humanos", "Tribunal de Justicia de la Union Europea"],
  },
  {
    title: "Tema 5. Administracion General del Estado",
    area: "Ciencias juridicas",
    focus: ["principios de organizacion", "relaciones con ciudadanos", "organos superiores", "organos directivos", "Gobierno en funciones"],
  },
  {
    title: "Tema 6. Funcionarios publicos",
    area: "Ciencias juridicas",
    focus: ["concepto de funcionario", "clases de funcionarios", "adquisicion de la condicion", "perdida de la condicion", "regimen funcionarial"],
  },
  {
    title: "Tema 7. Ministerio del Interior",
    area: "Ciencias juridicas",
    focus: ["estructura organica basica", "Secretaria de Estado de Seguridad", "funciones de seguridad", "organos dependientes", "coordinacion interior"],
  },
  {
    title: "Tema 8. Direccion General de la Policia",
    area: "Ciencias juridicas",
    focus: ["servicios centrales", "servicios territoriales", "funciones de la Policia Nacional", "escalas y categorias", "regimen disciplinario"],
  },
  {
    title: "Tema 9. Fuerzas y Cuerpos de Seguridad",
    area: "Ciencias juridicas",
    focus: ["principios basicos de actuacion", "disposiciones estatutarias", "Consejo de Policia", "Policia Judicial", "coordinacion con policias autonomicas y locales"],
  },
  {
    title: "Tema 10. Entrada y residencia en Espana",
    area: "Ciencias juridicas",
    focus: ["ciudadanos de la Union Europea", "derechos de extranjeros", "entrada y salida", "autorizacion de estancia", "autorizacion de residencia"],
  },
  {
    title: "Tema 11. Infracciones de extranjeria",
    area: "Ciencias juridicas",
    focus: ["infracciones leves", "infracciones graves", "infracciones muy graves", "sanciones y prescripcion", "expulsion y devolucion"],
  },
  {
    title: "Tema 12. Proteccion internacional",
    area: "Ciencias juridicas",
    focus: ["reconocimiento de proteccion internacional", "menores vulnerables", "centros de acogida", "apatridas", "desplazados"],
  },
  {
    title: "Tema 13. Seguridad privada",
    area: "Ciencias juridicas",
    focus: ["disposiciones generales", "coordinacion", "empresas de seguridad", "detectives privados", "personal y medidas de seguridad"],
  },
  {
    title: "Tema 14. Proteccion de la seguridad ciudadana",
    area: "Ciencias juridicas",
    focus: ["documentacion e identificacion", "mantenimiento de seguridad ciudadana", "potestades de policia administrativa", "regimen sancionador", "Ley Organica 4/2015"],
  },
  {
    title: "Tema 15. Infraestructuras criticas",
    area: "Ciencias juridicas",
    focus: ["proteccion de infraestructuras criticas", "Catalogo Nacional", "Sistema de Proteccion", "ciberseguridad", "coordinacion estrategica"],
  },
  {
    title: "Tema 16. Derecho Penal Parte General",
    area: "Ciencias juridicas",
    focus: ["principios del Derecho Penal", "infraccion penal", "grados de ejecucion", "responsabilidad criminal", "circunstancias modificativas"],
  },
  {
    title: "Tema 17. Derecho Penal Especial I",
    area: "Ciencias juridicas",
    focus: ["homicidio y sus formas", "aborto", "lesiones", "delitos contra la libertad", "delitos contra la libertad sexual"],
  },
  {
    title: "Tema 18. Delitos patrimoniales",
    area: "Ciencias juridicas",
    focus: ["hurto", "robo", "extorsion", "usurpacion", "estafas y apropiacion indebida"],
  },
  {
    title: "Tema 19. Delitos contra el orden publico",
    area: "Ciencias juridicas",
    focus: ["atentados contra la autoridad", "resistencia y desobediencia", "desordenes publicos", "armas y municiones", "explosivos"],
  },
  {
    title: "Tema 20. Delitos informaticos",
    area: "Ciencias juridicas",
    focus: ["ciberdelitos", "derecho a la intimidad", "prueba digital", "proceso penal digital", "evidencias tecnologicas"],
  },
  {
    title: "Tema 21. Derecho Procesal Penal",
    area: "Ciencias juridicas",
    focus: ["jurisdiccion y competencia", "denuncia", "detencion y derechos del detenido", "habeas corpus", "Ministerio Fiscal y Policia Judicial"],
  },
  {
    title: "Tema 22. Estatuto de la victima",
    area: "Ciencias juridicas",
    focus: ["concepto de victima", "derechos basicos", "proteccion de victimas", "medidas de proteccion", "Ley 4/2015"],
  },
  {
    title: "Tema 23. Igualdad y no discriminacion",
    area: "Ciencias juridicas",
    focus: ["igualdad efectiva", "violencia de genero", "discapacidad y dependencia", "personas trans", "garantia LGTBI"],
  },
  {
    title: "Tema 24. Prevencion de Riesgos Laborales I",
    area: "Ciencias juridicas",
    focus: ["concepto de trabajo", "salud y condiciones de trabajo", "riesgos laborales", "prevencion y proteccion", "danos a la salud"],
  },
  {
    title: "Tema 25. Prevencion de Riesgos Laborales II",
    area: "Ciencias juridicas",
    focus: ["Ley 31/1995", "Reglamento de servicios de prevencion", "PRL en Policia Nacional", "PRL en la AGE", "derechos y deberes preventivos"],
  },
  {
    title: "Tema 26. Proteccion de datos",
    area: "Ciencias juridicas",
    focus: ["LO 3/2018", "garantia de derechos digitales", "LO 7/2021", "tratamiento con fines penales", "proteccion de datos personales"],
  },
  {
    title: "Tema 27. Derechos Humanos",
    area: "Ciencias sociales",
    focus: ["Declaracion Universal", "Convenio Europeo", "Convenio contra la Tortura", "Mecanismo Nacional de Prevencion", "Defensor del Pueblo"],
  },
  {
    title: "Tema 28. Globalizacion y antiglobalizacion",
    area: "Ciencias sociales",
    focus: ["globalizacion", "consecuencias sociales", "movimiento antiglobalizacion", "organizaciones y objetivos", "Foro Social Mundial"],
  },
  {
    title: "Tema 29. Actitudes y valores sociales",
    area: "Ciencias sociales",
    focus: ["formacion de actitudes", "estereotipos", "prejuicios y discriminacion", "xenofobia y dogmatismo", "grupos sociales"],
  },
  {
    title: "Tema 30. Principios eticos",
    area: "Ciencias sociales",
    focus: ["socializacion", "libertad y responsabilidad", "igualdad y solidaridad", "tolerancia", "delitos de odio"],
  },
  {
    title: "Tema 31. Inmigracion",
    area: "Ciencias sociales",
    focus: ["movimientos migratorios", "causas de migraciones", "tipos y efectos", "migraciones actuales", "integracion social"],
  },
  {
    title: "Tema 32. Geografia humana",
    area: "Ciencias sociales",
    focus: ["ciudad", "poblacion y grupos sociales", "demografia", "sociedad de masas", "medio ambiente"],
  },
  {
    title: "Tema 33. Seguridad",
    area: "Ciencias sociales",
    focus: ["seguridad individual", "seguridad colectiva", "seguridad publica y privada", "inseguridad", "teorias de la delincuencia"],
  },
  {
    title: "Tema 34. Drogodependencias",
    area: "Ciencias sociales",
    focus: ["concepto de droga", "adiccion y dependencia", "tolerancia", "politoxicomanias", "clasificacion de drogas"],
  },
  {
    title: "Tema 35. Desarrollo sostenible",
    area: "Ciencias sociales",
    focus: ["desarrollo sostenible", "cooperacion internacional", "sociedad y sostenibilidad", "gestion ambiental", "instrumentos ambientales"],
  },
  {
    title: "Tema 36. Gramatica espanola",
    area: "Ciencias sociales",
    focus: ["morfologia", "sustantivos y pronombres", "adjetivos y adverbios", "verbos", "sintaxis y oracion"],
  },
  {
    title: "Tema 37. Ortografia espanola",
    area: "Ciencias sociales",
    focus: ["reglas ortograficas", "uso de grafemas", "uso de la tilde", "signos ortograficos", "mayusculas y minusculas"],
  },
  {
    title: "Tema 38. Sistemas operativos",
    area: "Materias tecnico-cientificas",
    focus: ["funciones del sistema operativo", "MS-DOS Unix Linux Windows Mac OS", "sistemas operativos moviles", "almacenamiento", "sistemas de archivos"],
  },
  {
    title: "Tema 39. Redes informaticas",
    area: "Materias tecnico-cientificas",
    focus: ["modelo OSI", "modelo TCP/IP", "dispositivos de red", "DHCP DNS proxy", "IPv4 e IPv6"],
  },
  {
    title: "Tema 40. Inteligencia y OSINT",
    area: "Materias tecnico-cientificas",
    focus: ["dato informacion e inteligencia", "tipologias de inteligencia", "ciclo de inteligencia", "OSINT", "Surface Web Deep Web y Dark Web"],
  },
  {
    title: "Tema 41. Ciberdelincuencia",
    area: "Materias tecnico-cientificas",
    focus: ["phishing y spear phishing", "malware y ransomware", "ingenieria social", "APT e insider threat", "Cyber Kill Chain"],
  },
  {
    title: "Tema 42. Armas de fuego",
    area: "Materias tecnico-cientificas",
    focus: ["clasificacion de armas", "funcionamiento de armas de fuego", "cartucho y componentes", "armas prohibidas", "balistica forense"],
  },
  {
    title: "Tema 43. Vehiculo prioritario",
    area: "Materias tecnico-cientificas",
    focus: ["definicion de vehiculo prioritario", "facultades del conductor", "conducta de otros conductores", "conduccion en emergencia", "senales de emergencia"],
  },
  {
    title: "Tema 44. Seguridad en conduccion prioritaria",
    area: "Materias tecnico-cientificas",
    focus: ["seguridad activa", "seguridad pasiva", "turismos y motocicletas", "accidentes de trafico", "conduccion policial y traslado de detenidos"],
  },
  {
    title: "Tema 45. PRL en seguridad vial",
    area: "Materias tecnico-cientificas",
    focus: ["factores del trafico", "factor humano", "factor ambiental", "factor vehiculo", "mantenimiento preventivo"],
  },
] as const satisfies readonly TopicDefinition[];

export const topics = topicDefinitions.map((topic) => topic.title);

export type TestTopic = (typeof topics)[number];

const generalDistractors = [
  "la aprobacion de presupuestos municipales",
  "la organizacion de competiciones deportivas",
  "la gestion de archivos historicos privados",
  "la fabricacion industrial de alimentos",
  "el diseno de campanas comerciales",
  "la administracion de comunidades de propietarios",
];

function shuffle<T>(items: readonly T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function withCorrectAnswer(correctOption: string, distractors: string[]) {
  const options = shuffle([correctOption, ...shuffle(distractors).slice(0, 3)]);
  return {
    options,
    correct: String.fromCharCode(65 + options.indexOf(correctOption)),
  };
}

function buildTopicQuestions(topic: TopicDefinition): TestQuestion[] {
  const [first, second, third, fourth, fifth] = topic.focus;
  const foreignFocus = topicDefinitions
    .filter((candidate) => candidate.title !== topic.title)
    .flatMap((candidate) => candidate.focus);
  const distractors = shuffle([...foreignFocus, ...generalDistractors]);

  const q1 = withCorrectAnswer(first, distractors);
  const q2 = withCorrectAnswer(second, distractors);
  const q3 = withCorrectAnswer(third, distractors);
  const q4 = withCorrectAnswer(`${first} y ${second}`, distractors.map((item) => `${item} y ${shuffle(distractors)[0]}`));
  const q5 = withCorrectAnswer(fourth, distractors);
  const q6 = withCorrectAnswer(fifth, distractors);

  return [
    {
      question: `Cual de estos contenidos pertenece al ${topic.title}?`,
      ...q1,
      explanation: `${first} forma parte del ${topic.title}, dentro del area de ${topic.area}.`,
    },
    {
      question: `Que punto debes ubicar especialmente en el ${topic.title}?`,
      ...q2,
      explanation: `${second} es uno de los epigrafes incluidos en este tema del temario oficial.`,
    },
    {
      question: `Si una pregunta menciona "${third}", en que bloque encaja mejor?`,
      ...q3,
      explanation: `"${third}" se estudia dentro del ${topic.title}.`,
    },
    {
      question: `Que pareja de materias resume mejor parte del ${topic.title}?`,
      ...q4,
      explanation: `La combinacion correcta es "${first} y ${second}" porque ambas materias pertenecen al mismo tema.`,
    },
    {
      question: `Que submateria no conviene confundir fuera del ${topic.title}?`,
      ...q5,
      explanation: `${fourth} esta vinculada a este bloque y debe repasarse junto al resto de sus epigrafes.`,
    },
    {
      question: `Cual es otro contenido incluido en el ${topic.title}?`,
      ...q6,
      explanation: `${fifth} tambien aparece en la relacion de contenidos de este tema.`,
    },
  ];
}

export const sampleQuestions: Record<TestTopic, TestQuestion[]> = Object.fromEntries(
  topicDefinitions.map((topic) => [topic.title, buildTopicQuestions(topic)])
) as Record<TestTopic, TestQuestion[]>;

export function getRandomQuestions(topic: TestTopic, amount = 5) {
  return shuffle(sampleQuestions[topic] ?? []).slice(0, amount);
}
