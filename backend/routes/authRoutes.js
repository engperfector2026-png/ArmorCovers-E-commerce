const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ===================== AUTHENTICATION ROUTES =====================
router.post("/register", registerUser);
router.post("/login", loginUser);

// You can add more routes here later
// router.get("/me", protect, getCurrentUser);

module.exports = router;