const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order
const createOrder = async (req, res) => {
  try {
    const { buyer, product, amount } = req.body;

    const order = new Order({
      orderNumber: "ORD-" + Date.now(),
      buyer,
      product,
      amount,
      status: "Pending"
    });

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("buyer", "name email").populate("product", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
};