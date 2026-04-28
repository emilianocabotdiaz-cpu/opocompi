"use client";

import { FormEvent, useEffect, useState } from "react";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type TestQuestion = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

const modes = [
  { id: "dudas", label: "Dudas de temario" },
  { id: "test", label: "Generar test" },
  { id: "animo", label: "Companero de animo" },
  { id: "plan", label: "Plan semanal" },
];

const topics = ["Constitucion Espanola", "Derecho Penal", "Extranjeria", "Ortografia", "Psicotecnicos"];

const sampleQuestions: Record<string, TestQuestion[]> = {
  "Constitucion Espanola": [
    {
      question: "Que valores superiores proclama el articulo 1.1 de la Constitucion Espanola?",
      options: [
        "Unidad, autonomia, solidaridad y justicia.",
        "Libertad, justicia, igualdad y pluralismo politico.",
        "Legalidad, jerarquia normativa, publicidad y seguridad juridica.",
        "Igualdad, merito, capacidad y publicidad.",
      ],
      correct: "B",
      explanation: "El articulo 1.1 recoge libertad, justicia, igualdad y pluralismo politico. La opcion C mezcla principios del articulo 9.3.",
    },
    {
      question: "Donde reside la soberania nacional segun la Constitucion?",
      options: ["En las Cortes Generales.", "En el Rey.", "En el pueblo espanol.", "En el Gobierno."],
      correct: "C",
      explanation: "El articulo 1.2 establece que la soberania nacional reside en el pueblo espanol.",
    },
    {
      question: "Cual es la forma politica del Estado espanol?",
      options: ["Republica parlamentaria.", "Monarquia constitucional federal.", "Monarquia parlamentaria.", "Estado autonomico presidencialista."],
      correct: "C",
      explanation: "El articulo 1.3 establece que la forma politica del Estado espanol es la Monarquia parlamentaria.",
    },
  ],
  "Derecho Penal": [
    {
      question: "En terminos generales, que caracteriza al dolo eventual?",
      options: [
        "El autor quiere directamente el resultado como fin principal.",
        "El autor preve el resultado como posible y aun asi continua aceptando el riesgo.",
        "El autor actua sin ninguna representacion del resultado.",
        "El autor actua siempre por error invencible.",
      ],
      correct: "B",
      explanation: "En el dolo eventual el sujeto no busca necesariamente el resultado, pero lo asume como posible y continua actuando.",
    },
    {
      question: "Cuando puede hablarse de tentativa de forma general?",
      options: [
        "Cuando solo existe una idea interna no exteriorizada.",
        "Cuando se inicia la ejecucion del delito pero no se consuma por causas ajenas a la voluntad del autor.",
        "Cuando el delito se consuma completamente.",
        "Cuando la conducta es siempre imprudente.",
      ],
      correct: "B",
      explanation: "La tentativa exige inicio de ejecucion y falta de consumacion por causas independientes de la voluntad del autor.",
    },
    {
      question: "Que diferencia basica hay entre dolo e imprudencia?",
      options: [
        "En el dolo hay voluntad o aceptacion del resultado; en la imprudencia falta el cuidado debido.",
        "La imprudencia siempre implica intencion directa.",
        "El dolo solo existe en infracciones administrativas.",
        "No existe diferencia juridica relevante.",
      ],
      correct: "A",
      explanation: "El dolo se relaciona con querer o aceptar el resultado; la imprudencia con infringir el deber de cuidado.",
    },
  ],
  Extranjeria: [
    {
      question: "Cual es la diferencia general entre estancia y residencia?",
      options: [
        "La estancia es permanencia temporal; la residencia implica autorizacion para vivir en Espana durante un periodo mas estable.",
        "La residencia solo puede durar 24 horas.",
        "La estancia equivale siempre a nacionalidad espanola.",
        "No existe diferencia entre ambas figuras.",
      ],
      correct: "A",
      explanation: "De forma general, la estancia es permanencia temporal y la residencia supone una autorizacion de permanencia mas estable.",
    },
    {
      question: "Que debe hacer OpoCompi si una pregunta depende de normativa de extranjeria vigente?",
      options: [
        "Inventar el articulo mas probable.",
        "Responder con cautela y recomendar verificar fuente oficial actualizada.",
        "Citar academias como fuente definitiva.",
        "Evitar siempre responder cualquier concepto.",
      ],
      correct: "B",
      explanation: "Extranjeria cambia y exige prudencia: BOE y fuentes oficiales recientes tienen prioridad.",
    },
    {
      question: "Que enfoque es mas seguro al estudiar extranjeria para oposicion?",
      options: [
        "Memorizar esquemas antiguos sin comprobar fecha.",
        "Priorizar conceptos base y contrastar articulos o procedimientos con normativa vigente.",
        "Estudiar solo casos practicos sin teoria.",
        "No hacer tests porque la materia cambia.",
      ],
      correct: "B",
      explanation: "La base conceptual ayuda, pero los detalles normativos deben contrastarse con fuente oficial actualizada.",
    },
  ],
  Ortografia: [
    {
      question: "Elige la forma correcta.",
      options: ["Preveer.", "Prever.", "Prevéer.", "Preveher."],
      correct: "B",
      explanation: "La forma correcta es prever. 'Preveer' es una forma incorrecta muy habitual.",
    },
    {
      question: "Cuando llevan tilde los monosilabos?",
      options: [
        "Siempre.",
        "Nunca, salvo casos de tilde diacritica.",
        "Solo si terminan en vocal.",
        "Solo si son verbos.",
      ],
      correct: "B",
      explanation: "Los monosilabos no se tildan por regla general, salvo casos de tilde diacritica como tu/tu, el/el, si/si.",
    },
    {
      question: "Identifica la palabra mal escrita.",
      options: ["Exorbitante.", "Exuberante.", "Exhuberante.", "Exhaustivo."],
      correct: "C",
      explanation: "La forma correcta es exuberante, sin h intercalada.",
    },
  ],
  Psicotecnicos: [
    {
      question: "Completa la serie: 3, 6, 12, 24, ...",
      options: ["30.", "36.", "42.", "48."],
      correct: "D",
      explanation: "Cada termino se multiplica por 2: 3, 6, 12, 24, 48.",
    },
    {
      question: "Si todos los A son B y algunos B son C, que conclusion es segura?",
      options: [
        "Todos los A son C.",
        "Algunos C son A necesariamente.",
        "Todos los A son B.",
        "Ningun B es C.",
      ],
      correct: "C",
      explanation: "La unica conclusion segura es la premisa dada: todos los A son B. No se puede asegurar relacion entre A y C.",
    },
    {
      question: "Serie alfabetica: A, C, F, J, O, ...",
      options: ["S.", "T.", "U.", "V."],
      correct: "C",
      explanation: "Los saltos son +2, +3, +4, +5; el siguiente salto es +6. O + 6 = U.",
    },
  ],
};

const paidWelcomeMessage =
  "Bienvenido compañero, estoy para ayudarte a ser Policía. Lo vas a conseguir y lo vamos a celebrar.";

const modeSupportMessages: Record<string, string> = {
  dudas: "Perfecto, compañero. Volvemos a dudas de temario: vamos a dejarlo claro, corto y útil para examen.",
  test: "Vamos con test. Practicar es avanzar: cada fallo corregido te acerca un poco más a tu plaza.",
  animo: "Estoy contigo. Respira, ordenamos el día y damos el siguiente paso. Esto se construye bloque a bloque.",
  plan: "Buena decisión. Vamos a organizar el estudio para que hoy salgas con trabajo hecho y cabeza tranquila.",
};

export default function Home() {
  const [pageNotice, setPageNotice] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState<"monthly" | "yearly" | null>(null);
  const [paidAccess, setPaidAccess] = useState(false);
  const [demoUses, setDemoUses] = useState(0);
  const [mode, setMode] = useState("dudas");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [level, setLevel] = useState("Base");
  const [testReady, setTestReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Puedes probarme gratis con 3 mensajes. Preguntame una duda, pideme un test o dime como llevas la semana.",
    },
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storedPaidAccess = localStorage.getItem("opocompi-paid-access") === "true";
    const storedUses = Number(localStorage.getItem("opocompi-demo-uses") ?? "0");

    if (params.get("checkout") === "success") {
      localStorage.setItem("opocompi-paid-access", "true");
      setPaidAccess(true);
      setPageNotice("Pago completado. Tu chat queda desbloqueado en este dispositivo.");
      setMessages([
        {
          id: "paid-welcome",
          role: "assistant",
          text: paidWelcomeMessage,
        },
      ]);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (params.get("checkout") === "cancelled") {
      setPageNotice("Pago cancelado. Puedes seguir usando la prueba gratuita si te quedan mensajes.");
      window.history.replaceState({}, "", window.location.pathname);
    }

    setPaidAccess(storedPaidAccess);
    setDemoUses(Number.isFinite(storedUses) ? storedUses : 0);

    const storedMessages = localStorage.getItem("opocompi-chat-messages");
    if (storedMessages && params.get("checkout") !== "success") {
      try {
        const parsedMessages = JSON.parse(storedMessages) as Message[];
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch {
        localStorage.removeItem("opocompi-chat-messages");
      }
    } else if (storedPaidAccess) {
      setMessages([
        {
          id: "paid-welcome",
          role: "assistant",
          text: paidWelcomeMessage,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("opocompi-chat-messages", JSON.stringify(messages));
  }, [messages]);

  function changeMode(nextMode: string) {
    if (nextMode === mode) return;
    setMode(nextMode);
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: modeSupportMessages[nextMode] ?? "Seguimos, compañero. Estoy contigo para avanzar paso a paso.",
      },
    ]);
  }

  async function startCheckout(plan: "monthly" | "yearly") {
    setPageNotice("");

    if (!checkoutEmail.trim()) {
      setPageNotice("Escribe tu email en la tarjeta de precios para contratar la membresia.");
      document.querySelector("#membresia")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setCheckoutLoading(plan);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, email: checkoutEmail }),
      });

      const checkout = await response.json();
      if (checkout.url) {
        window.location.href = checkout.url;
        return;
      }

      setPageNotice(checkout.error ?? "No se pudo abrir Stripe Checkout. Revisa las variables STRIPE_* en Vercel.");
    } catch {
      setPageNotice("No se pudo conectar con Stripe Checkout. Revisa Vercel y vuelve a hacer redeploy.");
    } finally {
      setCheckoutLoading(null);
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = prompt.trim();
    if (!text) return;

    if (!paidAccess && demoUses >= 3) {
      setPageNotice("Has usado los 3 mensajes gratuitos. Contrata la membresia para desbloquear el chat completo.");
      document.querySelector("#membresia")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text }]);
    setPrompt("");
    setBusy(true);

    if (!paidAccess) {
      const nextUses = demoUses + 1;
      setDemoUses(nextUses);
      localStorage.setItem("opocompi-demo-uses", String(nextUses));
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, mode }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", text: data.reply ?? data.error ?? "No pude responder ahora." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="OpoCompi inicio">
          <span className="brand-mark logo-mark">
            <img src="/brand/opocompi-logo.png" alt="" />
          </span>
          <span>OpoCompi</span>
        </a>
        <nav className="nav" aria-label="Navegacion principal">
          <a href="#asistente">Probar chat</a>
          <a href="#test">Tests</a>
          {!paidAccess ? <a href="#membresia">Precios</a> : null}
        </nav>
        {!paidAccess ? <a className="btn btn-primary" href="#membresia">Contratar</a> : null}
      </header>

      <main>
        {pageNotice ? (
          <div className="page-notice" role="status">
            {pageNotice}
          </div>
        ) : null}

        <section id="inicio" className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src="/brand/police-banner.png" alt="" />
          </div>
          <div className="hero-content">
            <img className="hero-logo" src="/brand/opocompi-logo.png" alt="Logotipo de OpoCompi" />
            <p className="eyebrow">Tu primer compañero en la Policía</p>
            <h1>OpoCompi</h1>
            <p className="hero-copy">
              El primer asistente para opositores de policía basado en IA generativa propia y totalmente enfocada a Policía Nacional.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#asistente">{paidAccess ? "Ir al chat" : "Probar 3 mensajes"}</a>
              {!paidAccess ? <a className="btn btn-secondary" href="#membresia">Ver precios</a> : null}
            </div>
          </div>
        </section>

        <section className="status-band" aria-label="Resumen de funciones">
          <article>
            <span>Dudas</span>
            <p>Explicaciones claras para estudiar sin atascarte.</p>
          </article>
          <article>
            <span>Tests</span>
            <p>Preguntas por bloque y entrenamiento tipo examen.</p>
          </article>
          <article>
            <span>Animo</span>
            <p>Un apoyo constante para sostener la rutina.</p>
          </article>
        </section>

        <section id="asistente" className="workspace">
          <div className="section-heading">
            <p className="eyebrow">Prueba gratuita</p>
            <h2>Chat de acompanamiento</h2>
            <p>
              Usa 3 mensajes gratis. Al contratar la membresia, el chat queda desbloqueado para seguir estudiando.
            </p>
          </div>

          <div className="app-shell">
            <aside className="side-panel">
              <div>
                <p className="panel-label">Estado</p>
                <div className={`member-badge ${paidAccess ? "active" : "locked"}`}>
                  {paidAccess ? "Membresia activa" : `Prueba ${Math.min(demoUses, 3)}/3`}
                </div>
              </div>

              <div className="focus-card">
                <p className="panel-label">Modo de ayuda</p>
                <div className="mode-list" role="listbox" aria-label="Modo del asistente">
                  {modes.map((item) => (
                    <button
                      className={`mode ${mode === item.id ? "active" : ""}`}
                      key={item.id}
                      onClick={() => changeMode(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <section className="chat-card" aria-label="Chat con el asistente">
              <div className="chat-messages" aria-live="polite">
                {messages.map((message) => (
                  <article className={`message ${message.role}`} key={message.id}>
                    <span>{message.role === "user" ? "Tu" : "OpoCompi"}</span>
                    <p>{message.text}</p>
                  </article>
                ))}
              </div>
              <form className="chat-form" onSubmit={sendMessage}>
                <input
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  type="text"
                  placeholder="Ej.: Hazme 5 preguntas sobre Constitucion Espanola"
                  disabled={busy}
                />
                <button className="btn btn-primary" type="submit" disabled={busy}>
                  {busy ? "Pensando..." : paidAccess ? "Enviar" : `Enviar (${Math.max(0, 3 - demoUses)} gratis)`}
                </button>
              </form>
            </section>
          </div>
        </section>

        <section id="test" className="test-section">
          <div className="section-heading compact">
            <p className="eyebrow">Entrenamiento</p>
            <h2>Generador rapido de test</h2>
          </div>
          <div className="test-builder">
            <label>
              Bloque
              <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                {topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Nivel
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                <option>Base</option>
                <option>Intermedio</option>
                <option>Exigente</option>
              </select>
            </label>
            <button className="btn btn-dark" type="button" onClick={() => setTestReady(true)}>
              Crear test
            </button>
          </div>
          <div className="test-output">
            {testReady
              ? sampleQuestions[topic].map((item, index) => (
                  <article className="question" key={item.question}>
                    <strong>{index + 1}. {item.question}</strong>
                    <ol type="A">
                      {item.options.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ol>
                    <p><strong>Respuesta correcta:</strong> {item.correct}</p>
                    <p>{item.explanation}</p>
                    <p>Nivel: {level}. Buen trabajo, compañero: corrige el fallo y seguimos avanzando.</p>
                  </article>
                ))
              : null}
          </div>
        </section>

        {!paidAccess ? (
          <section id="membresia" className="pricing">
            <div className="section-heading compact">
              <p className="eyebrow">Membresia</p>
              <h2>Acceso completo al chat</h2>
              <p>Introduce tu email, elige un plan y paga con Stripe. Al volver del pago, el chat quedara desbloqueado.</p>
            </div>
            <div className="purchase-form">
              <label>
                Email para la membresia
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(event) => setCheckoutEmail(event.target.value)}
                  placeholder="tu@email.com"
                />
              </label>
            </div>
            <div className="pricing-grid two">
              <article className="price-card">
                <h3>Mensual</h3>
                <p className="price">9,90 EUR<span>/mes</span></p>
                <ul>
                  <li>Chat IA privado</li>
                  <li>Tests por bloque</li>
                  <li>Acompanamiento motivacional</li>
                </ul>
                <button className="btn btn-secondary" type="button" onClick={() => startCheckout("monthly")}>
                  {checkoutLoading === "monthly" ? "Abriendo pago..." : "Contratar mensual"}
                </button>
              </article>
              <article className="price-card featured">
                <div className="tag">Ahorro anual</div>
                <h3>Oposicion completa</h3>
                <p className="price">90,90 EUR<span>/ano</span></p>
                <ul>
                  <li>Todo lo del plan mensual</li>
                  <li>Mejor precio para preparacion completa</li>
                  <li>Acceso continuado al chat</li>
                </ul>
                <button className="btn btn-primary" type="button" onClick={() => startCheckout("yearly")}>
                  {checkoutLoading === "yearly" ? "Abriendo pago..." : "Contratar anual"}
                </button>
              </article>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="footer">
        <p>OpoCompi debe usar contenido revisado por preparadores o fuentes oficiales antes de ponerse en produccion.</p>
      </footer>
    </>
  );
}
