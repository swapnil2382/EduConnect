// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['teacher'], default: 'teacher' },
    classes: [
        {
            className: { type: String, required: true }, // e.g., "4th"
            division: { type: String, required: true } // e.g., "A", "J"
        }
    ]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
