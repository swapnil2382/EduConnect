const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Fetch all users (for Admin Dashboard)
router.get("/users", async (req, res) => {
    try {
        const parents = await User.find({ role: "parent" });
        const teachers = await User.find({ role: "teacher" });

        res.json({
            totalParents: parents.length,
            totalTeachers: teachers.length,
            parents,
            teachers,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Add a new user (Parent/Teacher)
router.post("/add-user", async (req, res) => {
    try {
        const { name, email, password, phone, role, studentID, studentName, studentClass, studentDivision, teacherClass, teacherDivision, address } = req.body;
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const newUser = new User({
            name, email, password, phone, role, studentID, studentName, studentClass, studentDivision, teacherClass, teacherDivision, address
        });

        await newUser.save();
        res.status(201).json({ message: "User added successfully!" });

    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Edit User
router.put("/edit-user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete User
router.delete("/delete-user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
