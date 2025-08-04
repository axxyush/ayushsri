// src/components/JarvisChat.jsx
import { useState } from "react";

export default function JarvisChat() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput("");

    const res = await fetch("/api/jarvis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newHistory }),
    });
    const { reply } = await res.json();
    setHistory([...newHistory, { role: "assistant", content: reply }]);
  }

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setOpen((o) => !o)}
      >
        💬 JARVIS
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-black bg-opacity-90 text-white p-4 rounded-lg flex flex-col">
          <div className="flex-1 overflow-y-auto mb-2">
            {history.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <p className="inline-block bg-gray-800 p-2 rounded-md my-1">
                  {m.content}
                </p>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              className="flex-1 p-2 rounded-l-md text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask JARVIS…"
            />
            <button
              className="bg-red-700 px-4 rounded-r-md"
              onClick={sendMessage}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
