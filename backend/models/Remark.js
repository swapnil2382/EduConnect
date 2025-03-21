const mongoose = require("mongoose");

const RemarkSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    remark: { type: String, required: true },
    date: { type: Date, required: true }, // ✅ Now explicitly required
});

module.exports = mongoose.model("Remark", RemarkSchema);
