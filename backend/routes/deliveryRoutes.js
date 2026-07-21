const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  registerRider,
  updateLocation,
  findNearestRider,
  acceptDelivery,
  updateDeliveryStatus
} = require("../controllers/deliveryController");

// Rider Routes
router.post("/register", protect, registerRider);
router.post("/update-location", protect, updateLocation);

// Order Delivery Routes
router.post("/find-nearest", protect, findNearestRider);
router.post("/accept/:orderId", protect, acceptDelivery);
router.post("/update-status/:orderId", protect, updateDeliveryStatus);

module.exports = router;