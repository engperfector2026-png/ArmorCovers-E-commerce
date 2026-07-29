const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin", "vendor"],
      default: "buyer",
    },

    // WhatsApp / contact number (Kenya format e.g. 0712345678 or 254712345678)
    phone: { type: String, default: "" },

    photo: String,
    avatar: String,

    // ===== DOCUMENTS STORED IN DATABASE (paths) =====
    documents: {
      passport: { type: String, default: null },
      kraCertificate: { type: String, default: null },
      nationalIdFront: { type: String, default: null },
      nationalIdBack: { type: String, default: null },
      sellingLicence: { type: String, default: null },
    },

    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);