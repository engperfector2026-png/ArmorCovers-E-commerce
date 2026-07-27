const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

// @desc    Create new review
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Please add rating and comment" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Temporarily skip user check (for testing)
    // In production, add protect middleware

    const review = await Review.create({
      user: req.user ? req.user._id : null,   // Safe check
      product: productId,
      rating: Number(rating),
      comment
    });

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const numReviews = reviews.length;
    const avgRating = numReviews > 0 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews 
      : 0;

    product.rating = avgRating;
    product.numReviews = numReviews;
    await product.save();

    res.status(201).json({ 
      message: "Review added successfully", 
      review 
    });
  } catch (error) {
    console.error("Review creation error:", error);
    res.status(500).json({ 
      message: "Failed to submit review", 
      error: error.message 
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getProductReviews };