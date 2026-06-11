const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  stock: {
    type: Number,
    default: 1,
    min: 0,
  },
  image: {
    type: String,
    default: "",
  },
  brand: {
    type: String,
    default: "",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true   ← Commented out for now (this often causes issues)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);