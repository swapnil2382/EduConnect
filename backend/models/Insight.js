const mongoose = require("mongoose");

const InsightSchema = new mongoose.Schema({
    studentID: String,
    insights: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Insight", InsightSchema);
