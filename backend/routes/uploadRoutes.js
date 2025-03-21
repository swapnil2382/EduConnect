const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Upload = require("../models/Upload");
const User = require("../models/User");
const router = express.Router();

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Upload a file for a student
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const { studentId } = req.body;
      const fileUrl = `/uploads/${req.file.filename}`; // URL of the uploaded file
      const fileName = req.file.originalname;
  
      // Create new upload entry in the database
      const newUpload = new Upload({
        studentId,
        fileName,
        fileUrl,
      });
  
      await newUpload.save();
  
      // Respond with the file details
      res.status(201).json({
        fileUrl,
        fileName,
        uploadDate: newUpload.createdAt, // Return the creation date of the upload
      });
    } catch (error) {
      console.error("Error saving upload:", error);
      res.status(500).json({ message: "Failed to upload file." });
    }
  });
// Fetch files uploaded for a specific student (for parent to view)
router.get("/student/:studentId", async (req, res) => {
    try {
        const uploads = await Upload.find({ studentId: req.params.studentId });

        if (!uploads.length) {
            return res.status(404).json({ message: "No uploads found for this student" });
        }

        res.status(200).json(uploads);
    } catch (error) {
        console.error("Error fetching uploads:", error);
        res.status(500).json({ message: "Error fetching uploads" });
    }
});

module.exports = router;
