"use client";

import { FormEvent, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-browser";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

function renderMessageText(text: string) {
  const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const isList = lines.length > 1 && lines.every((line) => /^[-*]\s+/.test(line) || /^\d+[.)]\s+/.test(line));

    if (isList) {
      return (
        <ul className="message-list" key={`${block}-${blockIndex}`}>
          {lines.map((line) => (
            <li key={line}>{line.replace(/^[-*]\s+/, "").replace(/^\d+[.)]\s+/, "")}</li>
          ))}
        </ul>
      );
    }

    return (
      <p className="message-paragraph" key={`${block}-${blockIndex}`}>
        {lines.map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`}>
            {line}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    );
  });
}

const paidWelcomeMessage =
  "Bienvenido companero, estoy para ayudarte a ser Policia. Lo vas a conseguir y lo vamos a celebrar. Dime en que te puedo ayudar, compi.";

const trialWelcomeMessage =
  "Bienvenido a OpoCompi. Puedes probar 3 mensajes gratis; preguntame una duda, pideme un test o cuentame como llevas el estudio.";

export default function OpoCompiAppPage() {
  const [notice, setNotice] = useState("");
  const [paidAccess, setPaidAccess] = useState(false);
  const [demoUses, setDemoUses] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: trialWelcomeMessage,
    },
  ]);

  useEffect(() => {
    const supabaseClient = supabase;
    const params = new URLSearchParams(window.location.search);
    const checkoutSuccess = params.get("checkout") === "success";
    const storedPaidAccess = !isSupabaseConfigured && localStorage.getItem("opocompi-paid-access") === "true";
    const storedUses = Number(localStorage.getItem("opocompi-demo-uses") ?? "0");
    const storedMessages = localStorage.getItem("opocompi-chat-messages");

    if (checkoutSuccess) {
      setNotice("Pago completado. Estamos comprobando tu membresia.");
      window.history.replaceState({}, "", window.location.pathname);
    }

    setPaidAccess(storedPaidAccess);
    setDemoUses(Number.isFinite(storedUses) ? storedUses : 0);

    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages) as Message[];
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch {
        localStorage.removeItem("opocompi-chat-messages");
      }
    } else if (storedPaidAccess) {
      setMessages([{ id: "paid-welcome", role: "assistant", text: paidWelcomeMessage }]);
    }

    async function loadSession() {
      if (!supabaseClient || !isSupabaseConfigured) return;

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!session) {
        setUserEmail("");
        return;
      }

      const email = session.user.email ?? "";
      setUserEmail(email);
      setLoginEmail((current) => current || email);

      try {
        const response = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const profile = await response.json();
        if (profile.hasAccess) {
          localStorage.setItem("opocompi-paid-access", "true");
          setPaidAccess(true);
          if (!storedMessages) {
            setMessages([{ id: "paid-welcome", role: "assistant", text: paidWelcomeMessage }]);
          }
        }
      } catch {
        setNotice("No pude comprobar la membresia ahora. Recarga en unos segundos.");
      }
    }

    loadSession();

    if (!supabaseClient || !isSupabaseConfigured) return;

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("opocompi-chat-messages", JSON.stringify(messages));
  }, [messages]);

  async function loginWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    if (!loginEmail.trim()) {
      setNotice("Escribe tu email para enviarte el enlace de acceso.");
      return;
    }

    setAuthLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, redirectTo: `${window.location.origin}/app` }),
      });
      const data = await response.json();
      setNotice(data.message ?? data.error ?? "Revisa tu email para entrar.");
    } catch {
      setNotice("No pude enviar el enlace de acceso.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function logout() {
    if (supabase) {
      await supabase.auth.signOut();
    }

    localStorage.removeItem("opocompi-paid-access");
    localStorage.removeItem("opocompi-chat-messages");
    setPaidAccess(false);
    setUserEmail("");
    setMessages([{ id: "welcome", role: "assistant", text: trialWelcomeMessage }]);
    setNotice("Sesion cerrada.");
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = prompt.trim();
    if (!text) return;

    if (!paidAccess && demoUses >= 3) {
      setNotice("Has usado los 3 mensajes gratuitos. Activa la membresia para seguir con OpoCompi.");
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
        body: JSON.stringify({ message: text, mode: "dudas" }),
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
    <main className="chat-app-page">
      <aside className="chat-app-sidebar">
        <a className="brand" href="/app" aria-label="OpoCompi app">
          <span className="brand-mark logo-mark">
            <img src="/brand/opocompi-logo.png" alt="" />
          </span>
          <span>OpoCompi</span>
        </a>

        <nav className="chat-app-nav" aria-label="Navegacion de la app">
          <a className="active" href="/app">Chat</a>
          <a href="/tests">Tests</a>
          <a href="/actualidad">Actualidad</a>
          <a href="/">Web</a>
        </nav>

        <section className="chat-app-account">
          <p className="panel-label">Cuenta</p>
          <strong>{paidAccess ? "Membresia activa" : `Prueba ${Math.min(demoUses, 3)}/3`}</strong>
          {userEmail ? <span>{userEmail}</span> : null}

          {!userEmail ? (
            <form onSubmit={loginWithEmail}>
              <input
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                placeholder="tu@email.com"
              />
              <button className="btn btn-secondary" type="submit" disabled={authLoading}>
                {authLoading ? "Enviando..." : "Entrar"}
              </button>
            </form>
          ) : (
            <button className="btn btn-secondary" type="button" onClick={logout}>
              Salir
            </button>
          )}

          {!paidAccess ? (
            <a className="btn btn-primary" href="/#membresia">
              Activar membresia
            </a>
          ) : null}
        </section>
      </aside>

      <section className="chat-app-main" aria-label="Chat OpoCompi">
        <header className="chat-app-header">
          <div>
            <p className="eyebrow">Tu companero de oposicion</p>
            <h1>Habla con OpoCompi</h1>
          </div>
          <a className="btn btn-secondary" href="/actualidad">Actualidad</a>
        </header>

        {notice ? <div className="chat-app-notice">{notice}</div> : null}

        <div className="chat-app-messages" aria-live="polite">
          {messages.map((message) => (
            <article className={`message ${message.role}`} key={message.id}>
              <span>{message.role === "user" ? "Tu" : "OpoCompi"}</span>
              <div className="message-body">{renderMessageText(message.text)}</div>
            </article>
          ))}
        </div>

        <form className="chat-app-form" onSubmit={sendMessage}>
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Pregunta una duda, pide un test o prepara un repaso..."
            disabled={busy}
          />
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? "Pensando..." : "Enviar"}
          </button>
        </form>
      </section>
    </main>
  );
}
