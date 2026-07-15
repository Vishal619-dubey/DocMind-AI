require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const documentRoutes = require("./routes/documentRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const chatRoutes = require("./routes/chatRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/knowledge", knowledgeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 DocMind AI Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});