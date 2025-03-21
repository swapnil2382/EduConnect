const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["teacher", "parent"], required: true },
    teacherID: { type: String, unique: true, sparse: true }, // Unique ID for teachers
    studentID: { type: String }, // Only for parents
    studentName: { type: String }, // Only for parents
    studentClass: { type: String }, // Only for parents - Class of the student
    studentDivision: { type: String }, // Only for parents - Division of the student
    teacherClass: { type: String }, // Only for teachers
    teacherDivision: { type: String }, // Only for teachers
    address: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
