const mongoose = require("mongoose");

<<<<<<< HEAD
const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
        image: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Ready for Delivery",
        "Out for Delivery",
        "Delivered",
        "Completed",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["M-Pesa", "M-Pesa on Delivery", "Cash on Delivery"],
      default: "M-Pesa",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    deliveryMethod: {
      type: String,
      enum: ["Boda Express", "Normal Delivery"],
      default: "Normal Delivery",
    },
    // Shipping info
    county: String,
    subCounty: String,
    shippingAddress: {
      county: String,
      subCounty: String,
      exactLocation: String,
      phone: String,
    },
    // Rider (only used for Boda Express)
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      default: null,
    },
    notes: String,
    mpesaReceipt: String,
  },
  { timestamps: true }
);
=======
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
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176

module.exports = mongoose.model("Order", orderSchema);