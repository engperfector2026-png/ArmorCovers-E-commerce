const express = require("express");
const router = express.Router();

const {
createOrder,
getOrders,
getOrderById,
getOrdersByUser,
updateOrderStatus,
} = require("../controllers/orderController");

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

// Get Orders By User
router.get("/user/:userId", getOrdersByUser);

// Get Single Order
router.get("/:id", getOrderById);

// Update Order Status
router.put("/:id/status", updateOrderStatus);

module.exports = router;
