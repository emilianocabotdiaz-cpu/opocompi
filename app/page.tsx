"use client";

import { FormEvent, useEffect, useState } from "react";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const modes = [
  { id: "dudas", label: "Dudas de temario" },
  { id: "test", label: "Generar test" },
  { id: "animo", label: "Companero de animo" },
  { id: "plan", label: "Plan semanal" },
];

const topics = ["Constitucion Espanola", "Derecho Penal", "Extranjeria", "Ortografia", "Psicotecnicos"];

const sampleQuestions: Record<string, string[]> = {
  "Constitucion Espanola": [
    "Que valores superiores proclama el articulo 1.1 de la Constitucion Espanola?",
    "Donde reside la soberania nacional segun la Constitucion?",
    "Que forma politica tiene el Estado espanol?",
  ],
  "Derecho Penal": [
    "Que diferencia hay entre dolo directo y dolo eventual?",
    "Cuando puede apreciarse tentativa en un delito?",
    "Que finalidad tienen las penas privativas de derechos?",
  ],
  Extranjeria: [
    "Que situaciones administrativas puede tener una persona extranjera en Espana?",
    "Que diferencia hay entre estancia y residencia?",
    "Que autoridad puede iniciar un expediente sancionador en materia de extranjeria?",
  ],
  Ortografia: [
    "Elige la forma correcta: prever / preveer.",
    "Cuando llevan tilde los monosilabos?",
    "Identifica la palabra mal escrita: exorbitante, exuberante, exhuberante.",
  ],
  Psicotecnicos: [
    "Completa la serie: 3, 6, 12, 24, ...",
    "Si todos los A son B y algunos B son C, que conclusion es segura?",
    "Ordena mentalmente una secuencia alternando numero, letra y figura.",
  ],
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
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (params.get("checkout") === "cancelled") {
      setPageNotice("Pago cancelado. Puedes seguir usando la prueba gratuita si te quedan mensajes.");
      window.history.replaceState({}, "", window.location.pathname);
    }

    setPaidAccess(storedPaidAccess);
    setDemoUses(Number.isFinite(storedUses) ? storedUses : 0);
  }, []);

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
          <a href="#membresia">Precios</a>
        </nav>
        <a className="btn btn-primary" href="#membresia">Contratar</a>
      </header>

      <main>
        {pageNotice ? (
          <div className="page-notice" role="status">
            {pageNotice}
          </div>
        ) : null}

        <section id="inicio" className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1521727857535-28d2047314ac?auto=format&fit=crop&w=1600&q=80" alt="" />
          </div>
          <div className="hero-content">
            <img className="hero-logo" src="/brand/opocompi-logo.png" alt="Logotipo de OpoCompi" />
            <p className="eyebrow">Tu companero de oposicion</p>
            <h1>OpoCompi</h1>
            <p className="hero-copy">
              Resuelve dudas, genera tests y recibe apoyo de estudio mientras preparas Policia Nacional. Pruebalo gratis con 3 mensajes.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#asistente">Probar 3 mensajes</a>
              <a className="btn btn-secondary" href="#membresia">Ver precios</a>
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
                      onClick={() => setMode(item.id)}
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
              ? sampleQuestions[topic].map((question, index) => (
                  <article className="question" key={question}>
                    <strong>{index + 1}. {question}</strong>
                    <ol type="A">
                      <li>Respuesta correcta pendiente de validar por preparador.</li>
                      <li>Distractor plausible para entrenar lectura fina.</li>
                      <li>Opcion parcialmente correcta con matiz juridico.</li>
                      <li>Respuesta claramente descartable.</li>
                    </ol>
                    <p>Nivel: {level}. Responde primero sin apuntes y corrige despues con explicacion.</p>
                  </article>
                ))
              : null}
          </div>
        </section>

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
      </main>

      <footer className="footer">
        <p>OpoCompi debe usar contenido revisado por preparadores o fuentes oficiales antes de ponerse en produccion.</p>
      </footer>
    </>
  );
}
