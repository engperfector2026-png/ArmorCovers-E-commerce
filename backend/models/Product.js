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
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);