const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  subcategory: String,
  price: { type: Number, required: true },
  wholesalePrice: Number,
  stock: { type: Number, default: 1 },
  minimumOrder: { type: Number, default: 1 },
  type: {
    type: String,
    enum: ["retail", "wholesale", "both", "warehouse"],
    default: "retail",
  },
  image: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // ====================== FLASH SALE FIELDS ======================
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
  // ==============================================================

  // ====================== WARRANTY FIELDS ======================
  warranty: {
    type: Boolean,
    default: false,
  },
  warrantyMonths: {
    type: Number,
    default: 0,
  },
  // ==============================================================

  // ====================== FREE GIFT FIELDS ======================
  hasFreeGift: {
    type: Boolean,
    default: false,
  },
  // New: multiple free gifts
  gifts: [
    {
      name: { type: String, required: true },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
    },
  ],
  // Legacy single-gift fields (kept for backward compatibility)
  giftName: {
    type: String,
  },
  giftDescription: {
    type: String,
  },
  giftImage: {
    type: String,
  },
  // ==============================================================

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