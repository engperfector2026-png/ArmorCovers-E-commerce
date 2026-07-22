const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ====================== MIDDLEWARE ======================
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====================== TEST ROUTE ======================
app.get("/test-db", async (req, res) => {
  try {
    const User = require("./models/User");
    const Product = require("./models/Product");
    const Rider = require("./models/Rider");

    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments().catch(() => 0);
    const ridersCount = await Rider.countDocuments().catch(() => 0);

    res.json({
      success: true,
      message: "Database connection & query test successful!",
      stats: { 
        totalUsers: usersCount, 
        totalProducts: productsCount,
        totalRiders: ridersCount 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================== BASIC ROUTE ======================
app.get("/", (req, res) => res.send("✅ ARMORCOVERS API Running with Rider System"));

// ====================== MAIN ROUTES ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ====================== RIDER ROUTES ======================
app.use("/api/delivery", require("./routes/deliveryRoutes"));

// ====================== CHAT ROUTE ======================
app.use("/api/chat", require("./routes/chatRoutes"));

// ====================== VERIFICATION ROUTES ======================
try {
  const verificationRoutes = require("./routes/verificationRoutes");
  app.use("/api/seller", verificationRoutes);
  console.log("✅ Verification routes loaded");
} catch (err) {
  console.log("⚠️ Verification routes not found yet");
}

// ====================== SOCKET.IO ======================
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ====================== START SERVER ======================
const connectDB = require("./config/db");

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔍 Test DB: http://localhost:${PORT}/test-db`);
    });
  } catch (error) {
    console.error("❌ Server Startup Failed:", error.message);
  }
};

startServer();