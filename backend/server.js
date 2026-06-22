const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ===================== MIDDLEWARE =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== STATIC FILES (IMAGES) =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===================== DATABASE =====================
const connectDB = require("./config/db");
connectDB();

// ===================== ROUTES =====================
app.get("/", (req, res) => {
  res.send("✅ ARMORCOVERS API is Running!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// ===================== 404 =====================
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route not found: ${req.originalUrl}` 
  });
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Images should be accessible at: http://localhost:${PORT}/uploads`);
});