const express = require("express");
const router = express.Router();
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

module.exports = router;