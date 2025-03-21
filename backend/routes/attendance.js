const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const LeaveRequest = require("../models/LeaveRequest"); // Import model


// ✅ POST: Mark attendance for a student
router.post("/", async (req, res) => {
    const { studentID, status, date } = req.body;

    if (!studentID || !status) {
        return res.status(400).json({ message: "Student ID and status are required" });
    }

    try {
        const attendance = new Attendance({
            studentID,
            status,
            date: date ? new Date(date) : new Date()  // ✅ Use provided date, otherwise default to today
        });

        await attendance.save();
        res.status(200).json({ message: "Attendance marked successfully" });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: "Error marking attendance" });
    }
});


// ✅ GET: Fetch attendance for a student based on studentID
router.get("/:studentID", async (req, res) => {
    try {
        const attendance = await Attendance.find({ studentID: req.params.studentID });

        if (attendance.length === 0) {
            return res.status(404).json({ message: "No attendance records found" });
        }

        res.json(attendance);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Error fetching attendance" });
    }
});

// ✅ GET: Generate attendance report (Weekly / Monthly)
router.get("/report/:studentID", async (req, res) => {
    try {
        const { studentID } = req.params;
        const { period } = req.query;

        if (!studentID) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        if (!period || !["weekly", "monthly"].includes(period)) {
            return res.status(400).json({ message: "Invalid or missing period" });
        }

        let startDate;
        const endDate = new Date();

        if (period === "weekly") {
            startDate = new Date();
            startDate.setDate(endDate.getDate() - 7);
        } else if (period === "monthly") {
            startDate = new Date();
            startDate.setMonth(endDate.getMonth() - 1);
        }

        const attendanceRecords = await Attendance.find({
            studentID,
            date: { $gte: startDate, $lte: endDate }
        });

        res.json({ studentID, period, attendanceRecords });
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/leave-request", async (req, res) => {
    try {
        const { studentID, date, reason } = req.body;
        const leave = new LeaveRequest({ studentID, date, reason, status: "Pending" });
        await leave.save();
        res.json({ message: "Leave request submitted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});


module.exports = router;
