const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    outOf: { type: Number, required: true }, // ✅ New field for total marks
    percentage: { type: Number }, // ✅ Auto-calculate percentage
    comments: { type: String, default: "" },
    date: { type: Date, default: Date.now } // Stores the date properly as a Date object

});

// Pre-save hook to calculate percentage
performanceSchema.pre("save", function (next) {
    this.percentage = ((this.marks / this.outOf) * 100).toFixed(2);
    next();
});

const Performance = mongoose.model("Performance", performanceSchema);
module.exports = Performance;
