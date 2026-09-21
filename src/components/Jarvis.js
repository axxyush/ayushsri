import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Jarvis() {
  const [hero, setHero] = useState(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "JARVIS online. Ask me anything about Ayush.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const pendingSend = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedHero");
    setHero(saved);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const variantMap = {
    Ironman: "danger",
    Wolverine: "warning",
    Spiderman2099: "primary",
    Hulk: "success",
  };
  const variant = variantMap[hero] || "danger";

  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://ayushsri.onrender.com/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, hero }),
      });
      const data = await res.json();
      const reply = data.reply || "Connection okay, but no reply received.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "My comms link glitched. If this persists, please email Ayush.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      const prompt = e.detail?.prompt || "";
      setOpen(true);
      if (!prompt) return;
      setInput(prompt);
      if (e.detail?.autoSend) {
        pendingSend.current = prompt;
      }
    };
    window.addEventListener("open-jarvis", handler);
    return () => window.removeEventListener("open-jarvis", handler);
  }, []);

  useEffect(() => {
    if (!open || !pendingSend.current) return undefined;
    const prompt = pendingSend.current;
    pendingSend.current = null;
    const t = setTimeout(() => {
      send(prompt);
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <section
        id="jarvis"
        style={{ backgroundColor: "#e9ededff" }}
        className="py-5"
      >
        <div className="container px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="display-5 fw-bold text-dark mb-3"
          >
            Ask Jarvis anything
          </motion.h2>
          <p className="text-secondary mb-4">
            Your always-on mission assistant — open the bubble anytime.
          </p>
          <button
            type="button"
            className={`btn btn-${variant} btn-lg px-4`}
            onClick={() => setOpen(true)}
          >
            <i className="fa-solid fa-robot me-2" />
            Open Jarvis
          </button>
        </div>
      </section>

      <div className="jarvis-float">
        <AnimatePresence>
          {open && (
            <motion.div
              className="jarvis-panel"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div className="jarvis-panel-header">
                <div>
                  <div className="fw-semibold text-white">Jarvis</div>
                  <span className="badge bg-success">Online</span>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close Jarvis"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div ref={chatRef} className="jarvis-panel-messages">
                {messages.map((m, i) => {
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={i}
                      className={`jarvis-bubble ${isUser ? "is-user" : "is-bot"}`}
                    >
                      {m.content}
                    </div>
                  );
                })}
                {loading && (
                  <div className="text-secondary small">JARVIS is thinking…</div>
                )}
              </div>

              <div className="jarvis-panel-input">
                <input
                  placeholder="Ask about Ayush…"
                  className="form-control"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                <button
                  className={`btn btn-${variant}`}
                  onClick={() => send()}
                  disabled={loading}
                  type="button"
                >
                  {loading ? "…" : "Send"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          className={`jarvis-fab btn btn-${variant}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close Jarvis" : "Open Jarvis"}
        >
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-robot"}`} />
        </button>
      </div>
    </>
  );
}

export default Jarvis;
