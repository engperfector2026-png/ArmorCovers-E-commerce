const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Get Admin Dashboard Stats
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSellers = await User.countDocuments({ role: { $in: ["seller", "vendor"] } });
    const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    res.json({
      totalUsers,
      activeSellers,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;