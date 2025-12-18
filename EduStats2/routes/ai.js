import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/ai-insights", async (req, res) => {
  try {
    const { stats, studentResults } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost",
          "X-Title": "EduStats",
        },
        body: JSON.stringify({
          model: "google/gemma-3-12b-it:free",
          messages: [
            {
              role: "user",
              content: `Generate 5 actionable insights for these stats: ${JSON.stringify(
                stats
              )} and student results: ${JSON.stringify(
                studentResults
              )}.
Each insight must be on a new line.
Each line must start with a short title followed by a colon.`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("AI backend error:", err);
    res.status(500).json({ message: "AI service failed" });
  }
});

export default router;
