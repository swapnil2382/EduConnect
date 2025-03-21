const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema({
    studentID: { type: String, required: true },  // Student's unique ID
    date: { type: Date, required: true },  // Date of leave
    reason: { type: String, required: true },  // Reason for leave
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },  // Leave status
    createdAt: { type: Date, default: Date.now }  // Timestamp of request
});

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);
