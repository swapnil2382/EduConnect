const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body to check input data

        const {
            name, email, password, role, phone, address,
            teacherID, studentID, studentName, studentClass, studentDivision,
            teacherClass, teacherDivision
        } = req.body;

        // Common Validations
        if (!name || !email || !password || !role || !phone || !address) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Role-Based Validations
        if (role === "parent" && (!studentID || !studentName || !studentClass || !studentDivision)) {
            return res.status(400).json({ message: "Parent must provide student details!" });
        }

        if (role === "teacher" && (!teacherClass || !teacherDivision || !teacherID)) {
            return res.status(400).json({ message: "Teacher must provide assigned class, division, and unique ID!" });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Ensure Teacher ID is Unique (Only for teachers)
        if (role === "teacher" && teacherID) {
            const existingTeacher = await User.findOne({ teacherID });
            if (existingTeacher) {
                return res.status(400).json({ message: "Teacher ID already exists!" });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the user data
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            address,
            // Only assign teacherID for teachers, otherwise leave it undefined
            teacherID: role === "teacher" ? teacherID : undefined,
            studentID: role === "parent" ? studentID : undefined, // Only assign student details for parents
            studentName: role === "parent" ? studentName : undefined,
            studentClass: role === "parent" ? studentClass : undefined,
            studentDivision: role === "parent" ? studentDivision : undefined,
            teacherClass: role === "teacher" ? teacherClass : undefined,
            teacherDivision: role === "teacher" ? teacherDivision : undefined
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", userID: newUser._id });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // ✅ Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role, teacherID: user.teacherID || null },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error); // Logs actual error
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
});

module.exports = router;
