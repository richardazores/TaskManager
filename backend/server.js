// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS — must be before routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",                     // local Vite dev
      "https://task-manager-tau-ruddy.vercel.app" // deployed Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Routes
const taskRoutes = require("./Routes/Tasks");
app.use("/tasks", taskRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Port handling
const PORT = process.env.PORT || 5000; // fallback for local dev
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
