const express = require("express");
const Teacher = require("../models/Teacher");
const Parent = require("../models/Parent");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Authentication middleware
const router = express.Router();

// Protected Teacher Dashboard Route
router.get("/teacher-dashboard", authMiddleware, async (req, res) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access Denied. Teachers only." });
    }

    try {
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found." });
        }

        res.json(teacher.classes);
    } catch (err) {
        console.error("Error fetching teacher data:", err);
        res.status(500).json({ message: "Error fetching teacher data" });
    }
});

// Fetch students assigned to the teacher
router.get("/students", authMiddleware, async (req, res) => {
    try {
        const teacher = await User.findById(req.user.id);
        if (!teacher || teacher.role !== "teacher") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const students = await User.find({
            studentClass: teacher.teacherClass,
            studentDivision: teacher.teacherDivision,
            role: "parent",
        });

        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
