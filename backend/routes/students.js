const express = require("express");
const User = require("../models/User"); // Import User model
const router = express.Router();

// GET all students or filter by class and division
router.get("/", async (req, res) => {
    try {
        const { class: studentClass, division } = req.query;

        // Base query to fetch only students (parents' children)
        let query = { role: "parent" };

        // Apply class and division filter if provided
        if (studentClass && division) {
            query.parentClass = studentClass;
            query.parentDivision = division;
        }

        const students = await User.find(query).select("studentID studentName parentClass parentDivision");

        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students" });
    }
});

module.exports = router;
