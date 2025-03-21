// models/Parent.js
const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['parent'], default: 'parent' },
    student: {
        name: { type: String, required: true },
        class: { type: String, required: true }, // e.g., "4th"
        division: { type: String, required: true } // e.g., "A"
    }
});

const Parent = mongoose.model('Parent', parentSchema);
module.exports = Parent;
