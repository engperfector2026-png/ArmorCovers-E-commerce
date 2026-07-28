const mongoose = require("mongoose");

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

module.exports = mongoose.model("Rider", riderSchema);