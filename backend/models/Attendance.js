const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["Present", "Absent"], required: true },
    reason: { type: String, default: "-" } // Default "-" if present
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
