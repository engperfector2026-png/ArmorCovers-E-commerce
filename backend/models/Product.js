const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  wholesalePrice: Number,
  stock: { type: Number, default: 1 },
  minimumOrder: { type: Number, default: 1 },
  type: { 
    type: String, 
    enum: ['retail', 'wholesale', 'both'], 
    default: 'retail' 
  },
  image: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

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
    type: Number, // optional limited quantity for the flash sale
  },
  // ==============================================================

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);