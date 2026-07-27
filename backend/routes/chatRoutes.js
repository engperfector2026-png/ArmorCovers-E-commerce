const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini",           // Fast & cheap
      messages: [
        {
          role: "system",
          content: "You are a friendly and helpful sales assistant for ARMORCOVERS. Recommend products, answer questions about delivery, stock, and encourage purchases."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 400
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ success: true, reply });
  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    res.json({ 
      success: true, 
      reply: "Hi! How can I help you? Try asking about products, delivery, or stock." 
    });
  }
});

module.exports = router;