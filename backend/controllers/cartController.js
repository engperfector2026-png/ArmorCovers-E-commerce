const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const cartItem = await Cart.create(req.body);

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find()
      .populate("product")
      .populate("user");

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};