const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get My Orders (Buyer)
router.get("/my-orders", async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Track Order
router.get("/track/:trackingNumber", async (req, res) => {
  try {
    const order = await Order.findOne({ trackingNumber: req.params.trackingNumber });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;