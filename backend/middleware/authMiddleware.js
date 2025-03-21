const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from "Authorization" header
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Fetch user from the database
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found, authorization denied" });
        }

        req.user = user; // Attach user info to request
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ message: "Invalid token, please log in again" });
    }
};

module.exports = authMiddleware;
