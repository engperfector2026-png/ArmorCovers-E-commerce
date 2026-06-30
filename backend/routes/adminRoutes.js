const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Users
router.get("/users", adminController.getAllUsers);
router.put("/users/:id/status", adminController.toggleUserStatus);
router.delete("/users/:id", adminController.deleteUser);

// Orders
router.get("/orders", adminController.getAllOrders);
router.put("/orders/:id/status", adminController.updateOrderStatus);

// Payments
router.get("/payments", adminController.getAllPayments);

module.exports = router;

//Settings
router.get("/settings", adminController.getSettings);
router.put("/settings", adminController.updateSettings);