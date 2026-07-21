const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ===================== AUTH ROUTES =====================
router.post("/register", registerUser);
router.post("/login", loginUser);

// You can uncomment these later when middleware is ready
// const { protect } = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");

// router.post("/seller/verify", protect, upload.fields([...]), sellerVerification);
// router.post("/admin/verify", protect, upload.fields([...]), adminVerification);

module.exports = router;