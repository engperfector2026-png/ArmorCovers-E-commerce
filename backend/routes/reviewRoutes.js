const express = require("express");
const router = express.Router();

console.log("✅ Review routes LOADED - No dependencies");

router.post("/:productId/reviews", (req, res) => {
  console.log("📝 Review POST received:", req.body);
  res.status(201).json({
    success: true,
    message: "Review submitted successfully!",
    review: {
      _id: "temp123",
      rating: req.body.rating,
      comment: req.body.comment,
      createdAt: new Date()
    }
  });
});

router.get("/:productId/reviews", (req, res) => {
  res.json([]);
});

module.exports = router;