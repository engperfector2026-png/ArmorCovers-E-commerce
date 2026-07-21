const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");   // ← Correct path

// Get Admin Dashboard Stats (Protected)
router.get("/dashboard", protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSellers = await User.countDocuments({ role: { $in: ["seller", "vendor"] } });
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    res.json({
      totalUsers,
      activeSellers,
      totalRevenue: totalRevenueResult[0]?.total || 0,
      pendingOrders,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
});

module.exports = router;