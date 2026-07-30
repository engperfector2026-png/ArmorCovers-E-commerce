const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },

  category: { type: String, default: "General" },
  subcategory: { type: String, default: "" },

  price: { type: Number, required: true },
  wholesalePrice: { type: Number },
  stock: { type: Number, default: 1 },
  minimumOrder: { type: Number, default: 1 },
  type: {
    type: String,
    enum: ["retail", "wholesale", "both", "warehouse"],
    default: "retail",
  },
  image: { type: String, default: "" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // ====================== FLASH SALE ======================
  isFlashSale: {
    type: Boolean,
    default: false,
  },
  flashSalePrice: {
    type: Number,
  },
  flashSaleStart: {
    type: Date,
  },
  flashSaleEnd: {
    type: Date,
  },
  flashSaleStock: {
    type: Number,
  },

  // ====================== WARRANTY ======================
  warranty: {
    type: Boolean,
    default: false,
  },
  warrantyMonths: {
    type: Number,
    default: 0,
  },

  // ====================== FREE GIFTS ======================
  hasFreeGift: {
    type: Boolean,
    default: false,
  },
  gifts: [
    {
      name: { type: String, required: true },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
    },
  ],
  // Legacy single-gift fields
  giftName: { type: String },
  giftDescription: { type: String },
  giftImage: { type: String },

  reviews: [
    {
      name: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);