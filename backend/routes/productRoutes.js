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
} = require("../controllers/productController");

// CREATE PRODUCT
router.post("/", upload.single("image"), createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// WAREHOUSE PRODUCTS
router.get("/warehouse", async (req, res) => {
  try {
    const products = await Product.find({ 
      type: { $in: ['warehouse', 'both'] } 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PRODUCTS BY SELLER
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.sellerId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT
router.put("/:id", upload.single("image"), updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;