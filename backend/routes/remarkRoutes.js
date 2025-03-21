const express = require("express");
const router = express.Router();
const Remark = require("../models/Remark");

// ✅ POST - Add a new remark
router.post("/", async (req, res) => {
    try {
        const { studentID, remark, date } = req.body;

        // Validate input
        if (!studentID || !remark) {
            return res.status(400).json({ error: "Student ID and remark are required" });
        }

        // Validate and format date
        const selectedDate = date ? new Date(date) : new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time for accurate comparison

        if (selectedDate > today) {
            return res.status(400).json({ error: "Future dates are not allowed!" });
        }

        // Create new remark entry
        const newRemark = new Remark({
            studentID,
            remark,
            date: selectedDate,  // ✅ Store validated date
        });

        await newRemark.save();
        res.status(201).json({ message: "Remark added successfully" });
    } catch (error) {
        console.error("Error adding remark:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// ✅ GET - Fetch all remarks for a student
router.get("/:studentID", async (req, res) => {
    try {
        const { studentID } = req.params;
        const remarks = await Remark.find({ studentID }).sort({ date: -1 }); // Show latest first
        res.json(remarks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
