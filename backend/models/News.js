const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorName: { type: String, required: true }, // ✅ Ensure it's required
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
