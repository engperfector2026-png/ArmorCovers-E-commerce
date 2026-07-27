const Rider = require("../models/Rider");
const Order = require("../models/Order");
const Delivery = require("../models/Delivery");

// ===================== REGISTER RIDER =====================
const registerRider = async (req, res) => {
  try {
    const { fullName, phone, bikePlate, subCounty } = req.body;

    if (!fullName || !phone || !bikePlate || !subCounty) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingRider = await Rider.findOne({ phone });
    if (existingRider) {
      return res.status(400).json({
        success: false,
        message: "A rider with this phone number already exists",
      });
    }

    const idCopy = req.files?.idCopy?.[0]
      ? `/uploads/${req.files.idCopy[0].filename}`
      : "";
    const license = req.files?.license?.[0]
      ? `/uploads/${req.files.license[0].filename}`
      : "";
    const passportPhoto = req.files?.passportPhoto?.[0]
      ? `/uploads/${req.files.passportPhoto[0].filename}`
      : "";

    const rider = await Rider.create({
      fullName,
      phone,
      bikePlate,
      subCounty,
      idCopy,
      license,
      passportPhoto,
    });

    res.status(201).json({
      success: true,
      message: "Rider registered successfully! Waiting for approval.",
      rider: {
        id: rider._id,
        fullName: rider.fullName,
        phone: rider.phone,
        subCounty: rider.subCounty,
      },
    });
  } catch (error) {
    console.error("Rider Registration Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// ===================== GET ALL RIDERS (Admin) =====================
const getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.find().sort({ createdAt: -1 });
    res.status(200).json(riders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== APPROVE RIDER (Admin) =====================
const approveRider = async (req, res) => {
  try {
    const rider = await Rider.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    res.status(200).json({
      success: true,
      message: "Rider approved successfully",
      rider,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== GET AVAILABLE ORDERS =====================
const getAvailableOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Pending", "Processing", "Ready for Delivery"] },
      rider: null,
    })
      .populate("buyer", "name phone")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== ACCEPT ORDER (Boda Express) =====================
const acceptOrder = async (req, res) => {
  try {
    const { orderId, riderId } = req.body;

    if (!orderId || !riderId) {
      return res.status(400).json({
        message: "Order ID and Rider ID are required",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.rider) {
      return res.status(400).json({
        message: "Order already assigned to another rider",
      });
    }

    // 1. Update Order
    order.rider = riderId;
    order.status = "Out for Delivery";
    order.deliveryMethod = "Boda Express";
    await order.save();

    // 2. Create Delivery record automatically
    const delivery = await Delivery.create({
      order: order._id,
      rider: riderId,
      buyer: order.buyer,
      dropoffLocation: {
        county: order.county || order.shippingAddress?.county || "",
        subCounty: order.subCounty || order.shippingAddress?.subCounty || "",
        exactLocation: order.shippingAddress?.exactLocation || "",
      },
      deliveryFee: order.deliveryFee || 0,
      status: "Assigned",
    });

    // 3. Update Rider stats
    await Rider.findByIdAndUpdate(riderId, {
      $inc: { totalDeliveries: 1 },
    });

    res.status(200).json({
      success: true,
      message: "Order accepted & delivery created",
      order,
      delivery,
    });
  } catch (error) {
    console.error("Accept Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===================== ASSIGN NORMAL DELIVERY =====================
const assignNormalDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Out for Delivery";
    order.deliveryMethod = "Normal Delivery";
    await order.save();

    const delivery = await Delivery.create({
      order: order._id,
      buyer: order.buyer,
      dropoffLocation: {
        county: order.county || order.shippingAddress?.county || "",
        subCounty: order.subCounty || order.shippingAddress?.subCounty || "",
        exactLocation: order.shippingAddress?.exactLocation || "",
      },
      deliveryFee: order.deliveryFee || 0,
      status: "Assigned",
    });

    res.status(200).json({
      success: true,
      message: "Normal delivery assigned",
      order,
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== UPDATE DELIVERY STATUS =====================
const updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId, status } = req.body;

    const allowedStatuses = [
      "Assigned",
      "Picked Up",
      "In Transit",
      "Delivered",
      "Failed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    delivery.status = status;

    if (status === "Picked Up") {
      delivery.pickedUpAt = new Date();
    }

    if (status === "Delivered") {
      delivery.deliveredAt = new Date();

      // Also update the related Order
      await Order.findByIdAndUpdate(delivery.order, {
        status: "Delivered",
      });
    }

    await delivery.save();

    res.status(200).json({
      success: true,
      message: `Delivery status updated to ${status}`,
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== GET RIDER DASHBOARD DATA =====================
const getRiderDashboard = async (req, res) => {
  try {
    const { riderId } = req.params;

    const rider = await Rider.findById(riderId);
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayOrders = await Order.find({
      rider: riderId,
      updatedAt: { $gte: startOfDay },
    });

    const recentDeliveries = await Order.find({
      rider: riderId,
      status: { $in: ["Delivered", "Completed"] },
    })
      .sort({ updatedAt: -1 })
      .limit(5);

    res.status(200).json({
      rider,
      stats: {
        todayDeliveries: todayOrders.length,
        todayEarnings: todayOrders.reduce(
          (sum, o) => sum + (o.deliveryFee || o.amount || o.totalAmount || 0),
          0
        ),
        totalDeliveries: rider.totalDeliveries || 0,
        rating: rider.rating || 5,
      },
      recentDeliveries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== GET ALL DELIVERIES =====================
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("order")
      .populate("rider", "fullName phone")
      .populate("buyer", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== EXPORTS =====================
module.exports = {
  registerRider,
  getAllRiders,
  approveRider,
  getAvailableOrders,
  acceptOrder,
  assignNormalDelivery,
  updateDeliveryStatus,
  getRiderDashboard,
  getAllDeliveries,
};