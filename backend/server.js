const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploaded Images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Database
const connectDB = require("./config/db");
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("✅ ARMORCOVERS API is Running!");
});

// Auth Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Product Routes
app.use(
  "/api/products",
  require("./routes/productRoutes")
);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});