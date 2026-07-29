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

// Shared multer config for product + multiple free gift images
const productUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "giftImages", maxCount: 10 }, // plural – matches frontend
]);

// ===================== PRODUCT ROUTES =====================

// CREATE PRODUCT
router.post("/", productUpload, createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// WAREHOUSE PRODUCTS (with seller name + phone for WhatsApp)
router.get("/warehouse", async (req, res) => {
  try {
    const products = await Product.find({
      type: { $in: ["warehouse", "both"] },
    }).populate("seller", "name email phone");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).populate("seller", "name email phone");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PRODUCTS BY SELLER
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.params.sellerId,
    }).populate("seller", "name email phone");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

    if (isFlashSale !== undefined) product.isFlashSale = isFlashSale;
    if (flashSalePrice !== undefined) product.flashSalePrice = flashSalePrice;
    if (flashSaleStart) product.flashSaleStart = flashSaleStart;
    if (flashSaleEnd) product.flashSaleEnd = flashSaleEnd;
    if (flashSaleStock !== undefined) product.flashSaleStock = flashSaleStock;

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
      message:
        isFlashSale === false
          ? "Flash sale ended"
          : "Flash sale created successfully",
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

// ====================== WARRANTY ======================
// PUT /api/products/:id/warranty
router.put("/:id/warranty", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { warranty, warrantyMonths } = req.body;

    // Enable warranty
    if (
      warranty === true ||
      warranty === "true" ||
      Number(warrantyMonths) > 0
    ) {
      product.warranty = true;
      product.warrantyMonths = Number(warrantyMonths) || 12;
    }

    // Remove warranty
    if (
      warranty === false ||
      warranty === "false" ||
      Number(warrantyMonths) === 0
    ) {
      product.warranty = false;
      product.warrantyMonths = 0;
    }

    await product.save();

    res.json({
      success: true,
      message:
        product.warranty === false
          ? "Warranty removed"
          : "Warranty added successfully",
      data: product,
    });
  } catch (error) {
    console.error("Warranty error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT
router.put("/:id", productUpload, updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;