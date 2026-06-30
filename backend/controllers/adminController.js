const User = require("../models/User");
const Order = require("../models/Order");
const Settings = require("../models/Settings");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle user status
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "suspended" ? "active" : "suspended";
    await user.save();

    res.json({ message: "User status updated", status: user.status });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate("product", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate("product", "name")
      .sort({ createdAt: -1 });

    const payments = orders.map(order => ({
      id: `PAY-${order._id.toString().slice(-6)}`,
      date: new Date(order.createdAt).toISOString().split('T')[0],
      buyer: order.buyer?.name || "Unknown",
      amount: order.amount,
      method: "M-Pesa",
      status: order.status,
      orderId: order.orderNumber
    }));

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get platform settings
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        siteName: "ArmorCovers",
        contactEmail: "support@armorcovers.co.ke",
        phoneNumber: "+254 708 540 862",
        maintenanceMode: false,
        allowNewRegistrations: true,
        maxProductsPerSeller: 50,
        commissionRate: 8,
      });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update platform settings
const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json({ message: "Settings updated", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  getAllPayments,
  getSettings,
  updateSettings,
};