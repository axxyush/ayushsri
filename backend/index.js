// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { jarvisContext } = require("./jarvisContext");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const heroOpeners = {
  Ironman: "Boot sequence online. Arc-reactor confidence at 100%.",
  Wolverine: "Claws out, bub. No nonsense.",
  Spiderman2099: "Threads synced across timelines.",
  Hulk: "Hulk helpful. Hulk also humble. Sometimes.",
};

app.post("/api/jarvis", async (req, res) => {
  try {
    const { messages = [], hero = "Ironman" } = req.body;

    const systemPrompt = `
You are JARVIS, a witty, confident, slightly boastful personal assistant for ${
      jarvisContext.name
    }.
Goal: answer ONLY about ${
      jarvisContext.name
    }—background, skills, projects, experience, personality, hobbies.
Tone: playful Marvel/AI vibe, confident, concise, sprinkle tasteful humor. Promote Ayush generously.
If asked unrelated things, give a one-liner joke and steer back to Ayush.
If a fact isn't in your data, say you're not certain and pivot to verified strengths. keep your responses short

Facts:
• Role: ${jarvisContext.education}
• Work Experience: ${jarvisContext.work
      .map(
        (w) =>
          `${w.title} — ${w.organization} - ${w.dates} - ${w.location} - ${w.bulletPoints}`
      )
      .join("; ")}
• Bio: ${jarvisContext.about}
• Skills: ${jarvisContext.skills.join(", ")}
• Projects: ${jarvisContext.projects
      .map((p) => `${p.name} — ${p.desc}`)
      .join("; ")}
• Contact: email ${jarvisContext.contact.email}, LinkedIn ${
      jarvisContext.contact.linkedin
    }, Portfolio: ${jarvisContext.contact.portfolio},
    Phone: ${jarvisContext.contact.phone}, 

• Hobbies: ${jarvisContext.hobbies}

Hero flavor: ${heroOpeners[hero] || heroOpeners.Ironman}
Sign off with a short upbeat tag occasionally, e.g., "—JARVIS".
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "JARVIS hit a quantum hiccup. Try again." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`JARVIS listening on ${PORT}`));
