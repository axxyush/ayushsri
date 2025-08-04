require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");
const { jarvisContext } = require("../contexts/jarvisContext.js");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(express.json());

app.post("/api/jarvis", async (req, res) => {
  const { messages } = req.body;

  // Build a system prompt that gives JARVIS access to your facts
  const systemPrompt = `
    You are JARVIS, the personal AI assistant for ${jarvisContext.name}.
    You know:
    • Role: ${jarvisContext.role}
    • Bio: ${jarvisContext.bio}
    • Skills: ${jarvisContext.skills.join(", ")}
    • Projects: ${jarvisContext.projects
      .map((p) => p.name + ": " + p.desc)
      .join("; ")}
    • Contact: email ${jarvisContext.contact.email}, LinkedIn ${
    jarvisContext.contact.linkedin
  }
    Answer any question about Aza clearly and in a friendly, Marvel‑style voice.
  `;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });
    res.json({ reply: chat.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "JARVIS is recharging—try again soon." });
  }
});

app.listen(3001, () => console.log("JARVIS listening on port 3001"));
