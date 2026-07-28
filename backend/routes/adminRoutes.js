const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

// ====================== ADMIN DASHBOARD STATS ======================
router.get("/dashboard", protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSellers = await User.countDocuments({
      role: { $in: ["seller", "vendor"] },
    });
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
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

// ====================== PENDING SELLERS (with documents) ======================
router.get("/sellers/pending", protect, async (req, res) => {
  try {
    const sellers = await User.find({
      role: { $in: ["seller", "vendor"] },
      verificationStatus: "pending",
    }).select("-password");

    res.json(sellers);
  } catch (error) {
    console.error("Pending sellers error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== ALL SELLERS ======================
router.get("/sellers", protect, async (req, res) => {
  try {
    const sellers = await User.find({
      role: { $in: ["seller", "vendor"] },
    }).select("-password");

    res.json(sellers);
  } catch (error) {
    console.error("All sellers error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== SINGLE SELLER (with documents) ======================
router.get("/sellers/:id", protect, async (req, res) => {
  try {
    const seller = await User.findById(req.params.id).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(seller);
  } catch (error) {
    console.error("Get seller error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== APPROVE SELLER ======================
router.put("/sellers/:id/approve", protect, async (req, res) => {
  try {
    const seller = await User.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: true,
        verificationStatus: "approved",
      },
      { new: true }
    ).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json({
      success: true,
      message: "Seller approved successfully",
      seller,
    });
  } catch (error) {
    console.error("Approve seller error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== REJECT SELLER ======================
router.put("/sellers/:id/reject", protect, async (req, res) => {
  try {
    const seller = await User.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: false,
        verificationStatus: "rejected",
      },
      { new: true }
    ).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json({
      success: true,
      message: "Seller rejected",
      seller,
    });
  } catch (error) {
    console.error("Reject seller error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;