const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: String,
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",       // Buyer submitted
        "Approved",      // Admin/Seller approved
        "Rejected",      // Rejected
        "Processing",    // Return in progress
        "Completed",     // Refund done / item received
        "Cancelled",
      ],
      default: "Pending",
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    adminNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Return", returnSchema);