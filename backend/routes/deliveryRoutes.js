const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const upload = require("../middleware/upload");

const {
  registerRider,
  getAllRiders,
  approveRider,
  getAvailableOrders,
  acceptOrder,
  getRiderDashboard,
} = require("../controllers/deliveryController");

// PUBLIC
router.post(
  "/register",
  upload.fields([
    { name: "idCopy", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
  ]),
  registerRider
);

// RIDER DASHBOARD
router.get("/available-orders", getAvailableOrders);
router.post("/accept-order", acceptOrder);
router.get("/dashboard/:riderId", getRiderDashboard);

// ADMIN
router.get("/riders", getAllRiders);
router.put("/riders/:id/approve", approveRider);
=======
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
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176

module.exports = router;