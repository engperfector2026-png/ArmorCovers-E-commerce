const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  siteName: String,
  contactEmail: String,
  phoneNumber: String,
  maintenanceMode: Boolean,
  allowNewRegistrations: Boolean,
  maxProductsPerSeller: Number,
  commissionRate: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Settings", settingsSchema);