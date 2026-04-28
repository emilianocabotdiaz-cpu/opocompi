"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-browser";

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
  const [email, setEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [pageNotice, setPageNotice] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<"monthly" | "yearly" | null>(null);
  const [access, setAccess] = useState(!isSupabaseConfigured);
  const [subscriptionStatus, setSubscriptionStatus] = useState(isSupabaseConfigured ? "sin sesion" : "demo");
  const [mode, setMode] = useState("dudas");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [level, setLevel] = useState("Base");
  const [testReady, setTestReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Estoy contigo. Preguntame una duda del temario, pideme un test o dime como llevas la semana.",
    },
  ]);

  const memberLabel = useMemo(() => {
    if (access) return subscriptionStatus === "demo" ? "Modo demo activo" : "Membresia activa";
    return isSupabaseConfigured ? "Membresia inactiva" : "Modo demo";
  }, [access, subscriptionStatus]);

  useEffect(() => {
    async function loadSession() {
      if (!supabase) return;

      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return;

      const response = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const profile = await response.json();
        setAccess(Boolean(profile.hasAccess));
        setSubscriptionStatus(profile.subscriptionStatus ?? "inactive");
      }
    }

    loadSession();

    const authListener = supabase?.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => {
      authListener?.data.subscription.unsubscribe();
    };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    setPageNotice("");
    setAuthLoading(true);

    try {
      if (!supabase) {
        setAccess(true);
        setSubscriptionStatus("demo");
        setAuthMessage("Demo activada. Configura Supabase en Vercel para login real.");
        setPageNotice("Demo activada. Supabase aun no esta configurado en Vercel.");
        return;
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      const message = response.ok
        ? result.message
        : result.error ?? "No se pudo enviar el enlace de acceso.";
      setAuthMessage(message);
      setPageNotice(message);
    } catch {
      const message = "No se pudo llamar a /api/login. Revisa el ultimo despliegue de Vercel.";
      setAuthMessage(message);
      setPageNotice(message);
    } finally {
      setAuthLoading(false);
    }
  }

  async function startCheckout(plan: "monthly" | "yearly") {
    setPageNotice("");
    setCheckoutLoading(plan);

    if (!supabase) {
      setAccess(true);
      setSubscriptionStatus("demo");
      setPageNotice("Demo activada. Para pago real faltan Supabase y Stripe configurados en Vercel.");
      setCheckoutLoading(null);
      return;
    }

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        const message = "Primero inicia sesion con tu email. Despues podras contratar la membresia.";
        setAuthMessage(message);
        setPageNotice(message);
        document.querySelector("#asistente")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
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

    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text }]);
    setPrompt("");
    setBusy(true);

    let token = "";
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token ?? "";
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
          <span className="brand-mark">OC</span>
          <span>OpoCompi</span>
        </a>
        <nav className="nav" aria-label="Navegacion principal">
          <a href="#asistente">Asistente</a>
          <a href="#test">Tests</a>
          <a href="#membresia">Membresia</a>
          <a href="/setup">Setup</a>
        </nav>
        <a className="btn btn-primary" href="#membresia">Acceder</a>
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
            <p className="eyebrow">Preparacion acompanada para opositores</p>
            <h1>OpoCompi</h1>
            <p className="hero-copy">
              Asistente IA para resolver dudas, crear tests tipo examen y sostener la motivacion durante la oposicion a Policia Nacional.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#asistente">Entrar al asistente</a>
              <a className="btn btn-secondary" href="#membresia">Ver membresia</a>
            </div>
          </div>
        </section>

        <section className="status-band" aria-label="Resumen de funciones">
          <article>
            <span>IA</span>
            <p>Ruta server-side preparada para OpenAI sin exponer claves.</p>
          </article>
          <article>
            <span>Login</span>
            <p>Supabase Auth listo para acceso por email.</p>
          </article>
          <article>
            <span>Pago</span>
            <p>Stripe Checkout preparado para planes mensual y anual.</p>
          </article>
        </section>

        <section id="asistente" className="workspace">
          <div className="section-heading">
            <p className="eyebrow">Zona privada</p>
            <h2>Chat de acompanamiento</h2>
            <p>
              Cuando configures Supabase, Stripe y OpenAI en Vercel, esta zona funcionara con login, membresia y respuesta IA real.
            </p>
          </div>

          <div className="app-shell">
            <aside className="side-panel">
              <div>
                <p className="panel-label">Estado</p>
                <div className={`member-badge ${access ? "active" : "locked"}`}>{memberLabel}</div>
              </div>

              <form className="login-card" onSubmit={login}>
                <p className="panel-label">Acceso</p>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@email.com"
                  required={Boolean(supabase)}
                />
                <button className="btn btn-dark" type="submit">
                  {authLoading ? "Enviando..." : supabase ? "Enviar enlace" : "Activar demo"}
                </button>
                {authMessage ? <small>{authMessage}</small> : null}
              </form>

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
              {!access ? (
                <div className="locked-overlay">
                  <h3>Activa tu membresia para entrar al chat</h3>
                  <p>Inicia sesion y contrata un plan para desbloquear el asistente, los tests y el seguimiento.</p>
                  <a className="btn btn-primary" href="#membresia">Ver planes</a>
                </div>
              ) : null}

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
                  disabled={!access || busy}
                />
                <button className="btn btn-primary" type="submit" disabled={!access || busy}>
                  {busy ? "Pensando..." : "Enviar"}
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
            <p className="eyebrow">Acceso privado</p>
            <h2>Membresia para opositores</h2>
            <p>Stripe Checkout esta preparado. Solo faltan las claves y los IDs de precio en Vercel.</p>
          </div>
          <div className="pricing-grid">
            <article className="price-card">
              <h3>Mensual</h3>
              <p className="price">9,90 EUR<span>/mes</span></p>
              <ul>
                <li>Chat IA privado</li>
                <li>Tests por bloque</li>
                <li>Historial de progreso</li>
              </ul>
              <button className="btn btn-secondary" type="button" onClick={() => startCheckout("monthly")}>
                {checkoutLoading === "monthly" ? "Abriendo pago..." : "Contratar mensual"}
              </button>
            </article>
            <article className="price-card featured">
              <div className="tag">Recomendado</div>
              <h3>Oposicion completa</h3>
              <p className="price">90,90 EUR<span>/ano</span></p>
              <ul>
                <li>Todo lo del plan mensual</li>
                <li>Plan semanal personalizado</li>
                <li>Modo animo y seguimiento</li>
              </ul>
              <button className="btn btn-primary" type="button" onClick={() => startCheckout("yearly")}>
                {checkoutLoading === "yearly" ? "Abriendo pago..." : "Contratar anual"}
              </button>
            </article>
            <article className="price-card">
              <h3>Academia</h3>
              <p className="price">A medida</p>
              <ul>
                <li>Panel para preparadores</li>
                <li>Usuarios por grupo</li>
                <li>Contenido propio</li>
              </ul>
              <a className="btn btn-secondary" href="mailto:hola@opocompi.com">Solicitar demo</a>
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
