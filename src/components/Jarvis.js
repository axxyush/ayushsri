// src/components/Jarvis.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Jarvis() {
  const [hero, setHero] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "JARVIS online. Ask me anything about Ayush.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedHero");
    setHero(saved);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const variantMap = {
    Ironman: "danger",
    Wolverine: "warning",
    Spiderman2099: "primary",
    Hulk: "success",
  };
  const variant = variantMap[hero] || "danger";

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/jarvis", {
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
            "My comms link glitched. If this persists, check the server URL and API key.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center display-4 fw-bold text-dark mb-5"
          >
            Ask Jarvis anything!
          </motion.h2>

          <div className="mb-5">
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Chat bot start */}
                <div
                  className="d-flex justify-content-center"
                  style={{ width: "90vw" }}
                >
                  <div className="chat-box p-3" style={{ width: "90%" }}>
                    <div
                      className="card-body d-flex flex-column"
                      style={{ height: "70vh" }}
                    >
                      <div
                        className="border-bottom pb-2 mb-2"
                        style={{ borderColor: "#4b5563" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <h2
                            className="card-title text-light"
                            style={{ color: "#f9fcffff" }}
                          >
                            Jarvis
                          </h2>
                          <span className="badge bg-success text-white">
                            Online
                          </span>
                        </div>
                      </div>

                      {/* Messages */}
                      <div
                        ref={chatRef}
                        className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-2"
                        id="chatDisplay"
                      >
                        {messages.map((m, i) => {
                          const isUser = m.role === "user";
                          return (
                            <div
                              key={i}
                              className="chat-message text-white p-2 rounded"
                              style={{
                                backgroundColor: isUser ? "#3b82f6" : "#4b5563",
                                maxWidth: "60%",
                                alignSelf: isUser ? "flex-end" : "flex-start",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {m.content}
                            </div>
                          );
                        })}
                        {loading && (
                          <div
                            className="text-secondary small"
                            style={{ alignSelf: "flex-start" }}
                          >
                            JARVIS is thinking…
                          </div>
                        )}
                      </div>

                      {/* Input */}
                      <div
                        className="border-top pt-2 mt-2 mt-auto"
                        style={{ borderColor: "#4b5563" }}
                      >
                        <div className="d-flex gap-2">
                          <input
                            placeholder="Type your message..."
                            className="form-control p-2"
                            style={{
                              backgroundColor: "#374151",
                              color: "#ffffff",
                              borderColor: "#4b5563",
                            }}
                            id="chatInput"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                          />
                          <button
                            className={`btn btn-${variant}`}
                            style={{
                              padding: "0.375rem 0.75rem",
                              transition: "all 0.3s ease-in-out",
                            }}
                            id="sendButton"
                            onClick={send}
                            disabled={loading}
                          >
                            {loading ? "Sending..." : "Send"}
                          </button>
                        </div>

                        {/* Keep this line exactly, per your request */}
                        <div className="mt-2 text-secondary small">
                          Tip: Ask “Who is Ayush?” “Brag about Ayush.” “What
                          project fits a fintech role?” etc.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chat bot end */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jarvis;
