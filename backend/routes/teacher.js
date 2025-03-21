const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Route to get all teachers with their assigned class and division
router.get("/teachers", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Access Denied. Teachers only." });
        }

        const teachers = await User.find({ role: "teacher" }, "name teacherClass teacherDivision");
        res.json(teachers);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to get a specific teacher's dashboard based on class and division
router.get("/teacher-dashboard/:teacherId", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Access Denied. Teachers only." });
        }

        const teacher = await User.findById(req.params.teacherId);
        if (!teacher || teacher.role !== "teacher") {
            return res.status(404).json({ message: "Teacher not found." });
        }

        // Fetch students belonging to the same class and division as the teacher
        const students = await User.find(
            { role: "parent", parentClass: teacher.teacherClass, parentDivision: teacher.teacherDivision },
            "studentID studentName parentClass parentDivision"
        );

        res.json({
            teacher: {
                name: teacher.name,
                teacherClass: teacher.teacherClass,
                teacherDivision: teacher.teacherDivision,
            },
            students,
        });
    } catch (error) {
        console.error("Error fetching teacher dashboard:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
