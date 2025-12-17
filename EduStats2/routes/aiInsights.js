const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai/dist/index.cjs");

// API KEY
const genAI = new GoogleGenerativeAI("AIzaSyBGF_6ulSV-xjy6oO0gmBQbDrbBp3s3G2o");

router.post("/", async (req, res) => {
  try {
    console.log("AI Route Hit");
    const { stats, studentResults } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
      Analyze the following class performance:
      Stats: ${JSON.stringify(stats)}
      Students: ${JSON.stringify(studentResults)}
      Provide insights in 5 bullet points.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.json({ success: true, insights: text });

  } catch (err) {
    console.error("AI ERROR:", err);
    return res.json({ success: false, insights: null });
  }
});

module.exports = router;
