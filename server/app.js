const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const documentRoutes = require("./routes/documentRoutes");

const activityRoutes = require("./routes/activityRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// STATIC FILES (uploads access)
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/documents", documentRoutes);
app.use("/api/activity", activityRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("DocMind AI Server Running 🚀");
});

// DB CONNECT
mongoose
  .connect("mongodb://127.0.0.1:27017/docmind")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// SERVER START
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});