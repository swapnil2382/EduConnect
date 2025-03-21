const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        ref: "User", // Assuming you have a User model where students are stored
    },
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    },
}, { timestamps: true });

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
