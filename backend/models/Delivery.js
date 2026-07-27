const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickupLocation: {
      type: String,
      default: "ArmorCovers Warehouse",
    },
    dropoffLocation: {
      county: String,
      subCounty: String,
      exactLocation: String,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "Assigned",          // Rider accepted
        "Picked Up",         // Rider collected package
        "In Transit",        // On the way
        "Delivered",         // Successfully delivered
        "Failed",            // Could not deliver
        "Cancelled",
      ],
      default: "Assigned",
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
    pickedUpAt: Date,
    deliveredAt: Date,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);