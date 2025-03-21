const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');  // Ensure the Performance model is correctly imported

// POST: Mark performance for a student
router.post('/', async (req, res) => {
    console.log("Received data:", req.body);  // Log the incoming data

    const { studentID, marks, outOf, subject, comments ,date } = req.body;  // ✅ Added outOf

    // Check if required fields are missing
    if (!studentID || !marks || !outOf || !subject) {
        return res.status(400).json({ message: "Missing studentID, marks, outOf, or subject" });
    }

    try {
        // Create the performance data object and save it
        const performance = new Performance({
            studentID,
            marks,
            outOf,  // ✅ Ensure outOf is passed
            subject,
            comments,
            date: date ? new Date(date) : new Date(),  // Format date properly
        });

        await performance.save();  // Save performance data to the database
        res.status(200).json({ message: 'Performance updated successfully' });  // Success response
    } catch (error) {
        console.error("Error marking performance:", error);  // Log the error details
        res.status(500).json({ message: 'Error marking performance', error: error.message });  // Error response
    }
});

// GET: Fetch performance for a student based on studentID
router.get('/:studentID', async (req, res) => {
    console.log("Received studentID:", req.params.studentID); // ✅ Debugging

    try {
        const performance = await Performance.find({ studentID: req.params.studentID });
        console.log("Database response:", performance); // ✅ Debugging

        if (!performance || performance.length === 0) {
            console.log("Performance not found for:", req.params.studentID);
            return res.status(404).json({ message: 'Performance not found' });
        }

        res.json(performance);
    } catch (error) {
        console.error("Error fetching performance:", error);
        res.status(500).json({ message: 'Error fetching performance' });
    }
});




module.exports = router;
