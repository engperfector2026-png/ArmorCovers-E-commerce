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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database
const connectDB = require("./config/db");

// Routes
app.get("/", (req, res) => res.send("✅ ARMORCOVERS API Running with Chat & Notifications!"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));   // ← Added Admin Routes

// ===================== SOCKET.IO (Chat + Notifications) =====================
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Join Room (for Chat)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Send Chat Message
  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  // Send Notification
  socket.on("sendNotification", (data) => {
    const receiverRoom = data.receiverRoom || `user-${data.receiverId}`;
    io.to(receiverRoom).emit("newNotification", {
      id: Date.now(),
      type: data.type || "system",
      title: data.title,
      message: data.message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    console.log(`Notification sent to ${receiverRoom}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Socket.io + Notifications Active`);
    });

  } catch (error) {
    console.error("❌ Server Startup Failed:", error.message);
    process.exit(1);
  }
};

startServer();