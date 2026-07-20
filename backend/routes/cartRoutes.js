const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controllers/cartController");

router.post("/", addToCart);

router.get("/", getCartItems);

router.delete("/:id", deleteCartItem);

module.exports = router;