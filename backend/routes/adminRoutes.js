const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

// ====================== TEMP DEBUG (remove later) ======================
router.get("/users-count-test", async (req, res) => {
  try {
    const total = await User.countDocuments();
    const sellers = await User.countDocuments({
      role: { $in: ["seller", "vendor", "Seller", "Vendor"] },
    });
    const buyers = await User.countDocuments({
      role: { $in: ["buyer", "Buyer"] },
    });
    const sample = await User.find().select("name email role").limit(15);

    res.json({
      success: true,
      total,
      sellers,
      buyers,
      sample,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================== ADMIN DASHBOARD STATS ======================
router.get("/dashboard", protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const activeSellers = await User.countDocuments({
      role: { $in: ["seller", "vendor", "Seller", "Vendor"] },
    });

    const activeBuyers = await User.countDocuments({
      role: { $in: ["buyer", "Buyer"] },
    });

    let totalRevenue = 0;
    try {
      const totalRevenueResult = await Order.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $ifNull: ["$total", { $ifNull: ["$amount", 0] }] } },
          },
        },
      ]);
      totalRevenue = totalRevenueResult[0]?.total || 0;
    } catch (e) {
      console.log("Order aggregate skipped:", e.message);
    }

    let pendingOrders = 0;
    try {
      pendingOrders = await Order.countDocuments({
        status: { $in: ["Pending", "pending"] },
      });
    } catch (e) {
      console.log("Pending orders count skipped:", e.message);
    }

    res.json({
      success: true,
      totalUsers,
      activeSellers,
      activeBuyers,
      totalRevenue,
      pendingOrders,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
});

// ====================== ALL USERS ======================
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== PENDING SELLERS ======================
router.get("/sellers/pending", protect, async (req, res) => {
  try {
    const sellers = await User.find({
      role: { $in: ["seller", "vendor", "Seller", "Vendor"] },
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
      role: { $in: ["seller", "vendor", "Seller", "Vendor"] },
    }).select("-password");

    res.json(sellers);
  } catch (error) {
    console.error("All sellers error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== SINGLE SELLER ======================
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