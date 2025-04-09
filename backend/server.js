const express = require("express");
const http = require("http"); // Import http module
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app); // ✅ Create HTTP server

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendance");
const performanceRoutes = require("./routes/performance");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/students");
const remarkRoutes = require("./routes/remarkRoutes");
const newsRoutes = require("./routes/newsRoutes");
const chatRoutes = require("./routes/chat");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/admin");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/remarks", remarkRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", chatRoutes);
app.use("/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static("uploads"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "pt-communication"
    });
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.db.databaseName}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};


// Home Route
app.get("/", (req, res) => {
  res.send("Parent-Teacher Communication Portal API is running...");
});

// AI Analysis Route
app.post("/api/ai/analyze", async (req, res) => {
  try {
    const { marks } = req.body;
    const response = await axios.post("http://127.0.0.1:5001/analyze", { marks });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get AI analysis" });
  }
});

// ✅ Initialize Socket.io after defining `server`
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust for frontend URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {


  // Listen for attendance update
  socket.on("attendanceUpdate", (data) => {
    io.emit("attendanceUpdated", data);
  });

  // Listen for performance update
  socket.on("performanceUpdate", (data) => {
    io.emit("performanceUpdated", data);
  });

  // Listen for new remarks
  socket.on("remarkAdded", (data) => {
    io.emit("remarkNotification", data);
  });

  
});

// Start the server after connecting to the database
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
