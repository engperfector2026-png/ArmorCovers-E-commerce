const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,           // ← Added
} = require("../controllers/productController");

// ===================== PRODUCT ROUTES =====================

// Create Product
router.post("/", upload.single("image"), createProduct);

// Get All Products
router.get("/", getProducts);

// Get Products by Category
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Products by Seller
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.sellerId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Product
router.get("/:id", getProductById);

// Add Review to Product
router.post("/:id/reviews", addReview);        // ← NEW ROUTE

// Update Product
router.put("/:id", upload.single("image"), updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;