const express = require('express');
const News = require('../models/News'); // Import the News model
const router = express.Router();

// POST route to add news
router.post("/add", async (req, res) => {
    try {
        const { title, content, authorRole, authorName } = req.body;

        // ✅ Check if all fields are present
        if (!title || !content || !authorRole || !authorName) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // ✅ Create a new news entry
        const newNews = new News({ title, content, authorRole, authorName });
        await newNews.save();

        res.status(201).json({ message: "News added successfully", newNews });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
  

router.get("/get", async (req, res) => {
    try {
      const news = await News.find().sort({ createdAt: -1 });
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNews = await News.findByIdAndDelete(id);

        if (!deletedNews) {
            return res.status(404).json({ message: "News not found!" });
        }

        res.json({ message: "News deleted successfully!" });
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
