const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");

const upload = multer({ dest: "uploads/riders/" });

const {
  registerRider,
  getRiderProfile,
} = require("../controllers/deliveryController");

// Rider Registration (with file uploads)
router.post("/register", protect, upload.fields([
  { name: "idCopy", maxCount: 1 },
  { name: "license", maxCount: 1 },
  { name: "passportPhoto", maxCount: 1 }
]), registerRider);

// Get Rider Profile
router.get("/profile/:id", protect, getRiderProfile);

module.exports = router;