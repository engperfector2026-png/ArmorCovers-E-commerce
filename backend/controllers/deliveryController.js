const Rider = require("../models/Rider");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

// Register as Boda Boda Rider
const registerRider = async (req, res) => {
  try {
    const { phone, bikePlate } = req.body;
    const userId = req.user.id;

    const existingRider = await Rider.findOne({ user: userId });
    if (existingRider) {
      return res.status(400).json({ success: false, message: "Already registered as rider" });
    }

    const rider = new Rider({
      user: userId,
      name: req.user.name,
      phone,
      bikePlate,
      location: { coordinates: [0, 0] },
      isAvailable: true
    });

    await rider.save();
    res.status(201).json({ success: true, message: "Rider registered successfully", rider });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Rider Location (Real-time)
const updateLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    const userId = req.user.id;

    const rider = await Rider.findOne({ user: userId });
    if (!rider) return res.status(404).json({ message: "Rider not found" });

    rider.location = { type: 'Point', coordinates: [longitude, latitude] };
    await rider.save();

    res.json({ success: true, message: "Location updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find Nearest Available Rider
const findNearestRider = async (req, res) => {
  try {
    const { longitude, latitude, orderId } = req.body;

    const nearestRider = await Rider.findOne({
      isAvailable: true,
      currentOrder: null
    }).near({
      center: [longitude, latitude],
      maxDistance: 10000, // 10km radius
      spherical: true
    });

    if (!nearestRider) {
      return res.status(404).json({ message: "No available riders nearby" });
    }

    res.json({ success: true, rider: nearestRider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept Delivery
const acceptDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;
    const riderId = req.user.id; // Assuming rider is logged in

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.delivery.rider = riderId;
    order.delivery.status = "accepted";
    await order.save();

    await Rider.findByIdAndUpdate(riderId, { currentOrder: orderId, isAvailable: false });

    res.json({ success: true, message: "Delivery accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerRider,
  updateLocation,
  findNearestRider,
  acceptDelivery
};