const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
    default: () => "ORD-" + Math.floor(100000 + Math.random() * 900000),
  },

  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: Number,
  }],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  trackingNumber: {
    type: String,
    unique: true,
    default: () => "TRK-" + Math.floor(1000000 + Math.random() * 9000000),
  },

  deliveryAddress: {
    address: String,
    city: String,
    phone: String,
  },

  estimatedDelivery: {
    type: Date,
  },

  trackingHistory: [{
    status: String,
    message: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);