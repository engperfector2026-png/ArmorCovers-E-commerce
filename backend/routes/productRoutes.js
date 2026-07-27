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

<<<<<<< HEAD
// Optional: import protect middleware if you have it
// const { protect } = require("../middleware/authMiddleware");

=======
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
// ===================== PRODUCT ROUTES =====================

// CREATE PRODUCT
router.post("/", upload.single("image"), createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// WAREHOUSE PRODUCTS
router.get("/warehouse", async (req, res) => {
  try {
<<<<<<< HEAD
    const products = await Product.find({
      type: { $in: ["warehouse", "both"] },
=======
    const products = await Product.find({ 
      type: { $in: ['warehouse', 'both'] } 
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
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

<<<<<<< HEAD
// ====================== FLASH SALE ======================
// PUT /api/products/:id/flash-sale
router.put("/:id/flash-sale", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      isFlashSale,
      flashSalePrice,
      flashSaleStart,
      flashSaleEnd,
      flashSaleStock,
    } = req.body;

    // Update flash sale fields
    if (isFlashSale !== undefined) product.isFlashSale = isFlashSale;
    if (flashSalePrice !== undefined) product.flashSalePrice = flashSalePrice;
    if (flashSaleStart) product.flashSaleStart = flashSaleStart;
    if (flashSaleEnd) product.flashSaleEnd = flashSaleEnd;
    if (flashSaleStock !== undefined) product.flashSaleStock = flashSaleStock;

    // If ending the flash sale
    if (isFlashSale === false) {
      product.isFlashSale = false;
      product.flashSalePrice = undefined;
      product.flashSaleStart = undefined;
      product.flashSaleEnd = undefined;
      product.flashSaleStock = undefined;
    }

    await product.save();

    res.json({
      success: true,
      message: isFlashSale === false ? "Flash sale ended" : "Flash sale created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Flash sale error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

=======
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT
router.put("/:id", upload.single("image"), updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;