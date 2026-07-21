const Product = require("../models/Product");

// ======================================
// CREATE PRODUCT
// ======================================
const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      price, 
      description, 
      category, 
      stock, 
      wholesalePrice, 
      minimumOrder, 
      type 
    } = req.body;

    const product = new Product({
      name: name.trim(),
      price: parseFloat(price),
      description: description ? description.trim() : "",
      category: category || "General",
      stock: parseInt(stock) || 1,
      wholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : null,
      minimumOrder: parseInt(minimumOrder) || 1,
      type: type || 'retail',
      image: req.file ? `/uploads/${req.file.filename}` : "",
      seller: req.user ? req.user.id : null,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ======================================
// GET ALL PRODUCTS (Improved with logs)
// ======================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`📦 Found ${products.length} products in database`);
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// GET SINGLE PRODUCT
// ======================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// UPDATE PRODUCT
// ======================================
const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// DELETE PRODUCT
// ======================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};