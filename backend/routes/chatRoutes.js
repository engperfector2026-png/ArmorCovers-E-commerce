const express = require("express");
const router = express.Router();
const axios = require("axios");

// Chatbot Endpoint
router.post("/", async (req, res) => {
  const { message, userId, role } = req.body;

  try {
    // Call Grok API (or OpenAI)
    const aiResponse = await axios.post("https://api.x.ai/v1/chat/completions", {
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are an helpful assistant for ARMORCOVERS e-commerce. Help with products, orders, and give clear directives." },
        { role: "user", content: message }
      ]
    }, {
      headers: { Authorization: `Bearer ${process.env.GROK_API_KEY}` }
    });

    const reply = aiResponse.data.choices[0].message.content;

    // Optional: Save chat to database for history
    // await ChatHistory.create({ userId, message, reply });

    res.json({ success: true, reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, reply: "Sorry, I'm having trouble responding right now." });
  }
});

module.exports = router;