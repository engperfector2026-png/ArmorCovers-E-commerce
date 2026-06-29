const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  image: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [reviewSchema],           // ← Added
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);