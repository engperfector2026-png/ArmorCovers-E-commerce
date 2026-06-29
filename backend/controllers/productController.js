const Product = require("../models/Product");

// ======================================
// CREATE PRODUCT
// ======================================
const createProduct = async (req, res) => {
  try {
    console.log("=== CREATE PRODUCT REQUEST ===");
    console.log("Body:", req.body);
    console.log("File:", req.file ? req.file.filename : "No file");

    const { name, price, description, category, stock, brand } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, description, and category are required",
      });
    }

    const product = new Product({
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      category: category,
      stock: parseInt(stock) || 1,
      brand: brand ? brand.trim() : "",
      image: req.file ? `/uploads/${req.file.filename}` : "",
      seller: req.user ? req.user.id : null,
    });

    const savedProduct = await product.save();

    console.log("✅ Product created successfully:", savedProduct._id);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("❌ CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// ======================================
// GET ALL PRODUCTS
// ======================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate('seller', 'name storeName');

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ======================================
// GET SINGLE PRODUCT
// ======================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name storeName email');

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ======================================
// ADD REVIEW
// ======================================
const addReview = async (req, res) => {
  try {
    const { rating, comment, name } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required"
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const review = {
      name: name || "Anonymous Buyer",
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date()
    };

    product.reviews.push(review);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review
    });
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review"
    });
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
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ======================================
// DELETE PRODUCT
// ======================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,          // ← Added
};