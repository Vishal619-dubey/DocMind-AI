require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const documentRoutes = require("./routes/documentRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://jade-klepon-08bba1.netlify.app",
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/documents", documentRoutes);
app.use("/api/activity", activityRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DocMind AI Server Running 🚀",
  });
});

// Database
connectDB();

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Server Error:", error.message);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});