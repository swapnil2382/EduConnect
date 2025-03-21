const express = require("express");
const Together = require("together-ai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const together = new Together({ apiKey: process.env.TOGETHER_AI_API_KEY });

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Call Together AI with stricter instructions for short responses
        const response = await together.chat.completions.create({
            messages: [
                { role: "system", content: "Reply in only 1-2 sentences. Keep answers short and concise." }, 
                { role: "user", content: message }
            ],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            max_tokens: 50, // Slightly higher token limit to allow for 1-2 sentences
            stop: ["\n"], // Ensure a single response line
        });

        const reply = response.choices[0].message.content.trim();

        // Ensure reply doesn't exceed 2 lines
        const lines = reply.split("\n");
        if (lines.length > 2) {
            return res.status(400).json({ error: "Response is too long. Limit to 1-2 sentences." });
        }

        res.json({ reply: reply });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
