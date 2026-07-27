const express = require("express");
const router = express.Router();
const Return = require("../models/Return");
const Order = require("../models/Order"); // make sure you have this model
// Optional: protect routes with your auth middleware
// const { protect, admin } = require("../middleware/authMiddleware");

// ====================== CREATE RETURN REQUEST ======================
// POST /api/returns
router.post("/", async (req, res) => {
  try {
    const { order, customer, items, refundMethod } = req.body;

    if (!order || !customer || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order, customer and at least one item are required",
      });
    }

    const newReturn = await Return.create({
      order,
      customer,
      items,
      refundMethod: refundMethod || "mpesa",
      status: "requested",
    });

    res.status(201).json({
      success: true,
      message: "Return request submitted successfully",
      data: newReturn,
    });
  } catch (error) {
    console.error("Create return error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== GET ALL RETURNS (Admin) ======================
// GET /api/returns
router.get("/", async (req, res) => {
  try {
    const returns = await Return.find()
      .populate("order", "orderNumber totalAmount")
      .populate("customer", "name email phone")
      .populate("items.product", "name price images")
      .populate("rider", "name phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: returns.length,
      data: returns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== GET SINGLE RETURN ======================
// GET /api/returns/:id
router.get("/:id", async (req, res) => {
  try {
    const returnDoc = await Return.findById(req.params.id)
      .populate("order")
      .populate("customer", "name email phone")
      .populate("items.product", "name price images")
      .populate("rider", "name phone vehicle");

    if (!returnDoc) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    res.json({
      success: true,
      data: returnDoc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== GET RETURNS BY CUSTOMER ======================
// GET /api/returns/customer/:customerId
router.get("/customer/:customerId", async (req, res) => {
  try {
    const returns = await Return.find({ customer: req.params.customerId })
      .populate("order", "orderNumber totalAmount")
      .populate("items.product", "name price images")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: returns.length,
      data: returns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== UPDATE RETURN STATUS ======================
// PUT /api/returns/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const { status, adminNotes, rejectionReason, refundAmount, rider } = req.body;

    const allowedStatuses = [
      "requested",
      "approved",
      "rejected",
      "pickup_scheduled",
      "picked_up",
      "in_transit",
      "received",
      "refunded",
      "replaced",
      "closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updateData = { status };

    if (adminNotes) updateData.adminNotes = adminNotes;
    if (rejectionReason) updateData.rejectionReason = rejectionReason;
    if (refundAmount !== undefined) updateData.refundAmount = refundAmount;
    if (rider) updateData.rider = rider;

    // Auto-set timestamps
    if (status === "approved") updateData.approvedAt = new Date();
    if (status === "picked_up") updateData.pickedUpAt = new Date();
    if (status === "received") updateData.receivedAt = new Date();
    if (status === "refunded") updateData.refundedAt = new Date();

    const updatedReturn = await Return.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("order")
      .populate("customer", "name email phone")
      .populate("rider", "name phone");

    if (!updatedReturn) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    res.json({
      success: true,
      message: `Return status updated to ${status}`,
      data: updatedReturn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== ASSIGN RIDER TO RETURN ======================
// PUT /api/returns/:id/assign-rider
router.put("/:id/assign-rider", async (req, res) => {
  try {
    const { riderId } = req.body;

    if (!riderId) {
      return res.status(400).json({
        success: false,
        message: "Rider ID is required",
      });
    }

    const updatedReturn = await Return.findByIdAndUpdate(
      req.params.id,
      {
        rider: riderId,
        status: "pickup_scheduled",
      },
      { new: true }
    ).populate("rider", "name phone vehicle");

    if (!updatedReturn) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    res.json({
      success: true,
      message: "Rider assigned successfully",
      data: updatedReturn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;