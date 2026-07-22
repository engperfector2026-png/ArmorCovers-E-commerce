const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  bikePlate: { type: String, required: true },
  subCounty: { type: String, required: true },
  preferredAreas: [String],

  // Documents
  idCopy: String,
  license: String,
  passportPhoto: String,

  isAvailable: { type: Boolean, default: false },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  rating: { type: Number, default: 5.0 },
  totalDeliveries: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rider", riderSchema);