const mongoose = require("mongoose");

<<<<<<< HEAD
const riderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    bikePlate: {
      type: String,
      required: true,
    },
    subCounty: {
      type: String,
      required: true,
    },
    idCopy: {
      type: String, // file path
    },
    license: {
      type: String,
    },
    passportPhoto: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);
=======
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
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176

module.exports = mongoose.model("Rider", riderSchema);