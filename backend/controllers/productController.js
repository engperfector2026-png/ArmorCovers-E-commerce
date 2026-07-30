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
      subcategory,
      stock,
      wholesalePrice,
      minimumOrder,
      type,
      seller,
      hasFreeGift,
      gifts: giftsRaw,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const sellerId =
      (req.user && (req.user.id || req.user._id)) || seller || null;

    // Main product image
    const imageFile = req.file || req.files?.image?.[0];

    // Multiple gift images (field name: giftImages)
    const giftImageFiles = req.files?.giftImages || [];

    const freeGiftEnabled =
      hasFreeGift === true || hasFreeGift === "true";

    // Parse gifts array from frontend
    let gifts = [];
    if (freeGiftEnabled && giftsRaw) {
      try {
        const giftsMeta =
          typeof giftsRaw === "string" ? JSON.parse(giftsRaw) : giftsRaw;

        if (Array.isArray(giftsMeta)) {
          let imageIndex = 0;
          gifts = giftsMeta
            .filter((g) => g && g.name && String(g.name).trim())
            .map((g) => {
              const gift = {
                name: String(g.name).trim(),
                description: g.description
                  ? String(g.description).trim()
                  : "",
                image: undefined,
              };

              if (giftImageFiles[imageIndex]) {
                gift.image = `/uploads/${giftImageFiles[imageIndex].filename}`;
                imageIndex++;
              }

              return gift;
            });
        }
      } catch (parseErr) {
        console.error("Failed to parse gifts JSON:", parseErr);
      }
    }

    // Fallback: legacy single gift fields
    if (freeGiftEnabled && gifts.length === 0 && req.body.giftName) {
      const singleImage =
        giftImageFiles[0] || req.files?.giftImage?.[0];
      gifts = [
        {
          name: String(req.body.giftName).trim(),
          description: req.body.giftDescription
            ? String(req.body.giftDescription).trim()
            : "",
          image: singleImage
            ? `/uploads/${singleImage.filename}`
            : undefined,
        },
      ];
    }

    if (!Array.isArray(gifts)) {
      gifts = [];
    }

    const product = new Product({
      name: name.trim(),
      price: parseFloat(price),
      description: description ? description.trim() : "",
      category: category || "General",
      subcategory: subcategory ? String(subcategory).trim() : "",
      stock: parseInt(stock) || 1,
      wholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : null,
      minimumOrder: parseInt(minimumOrder) || 1,
      type: type || "retail",
      image: imageFile ? `/uploads/${imageFile.filename}` : "",
      seller: sellerId,
      isFlashSale: false,
      flashSalePrice: null,
      flashSaleStart: null,
      flashSaleEnd: null,
      flashSaleStock: null,
      warranty: false,
      warrantyMonths: 0,
      reviews: [],
      hasFreeGift: freeGiftEnabled && gifts.length > 0,
      gifts: gifts,
    });

    const savedProduct = await product.save();

    console.log(
      "✅ Product created:",
      savedProduct._id,
      "| Category:",
      savedProduct.category,
      "| Subcategory:",
      savedProduct.subcategory,
      "| Seller:",
      sellerId
    );

    if (
      savedProduct.hasFreeGift &&
      Array.isArray(savedProduct.gifts) &&
      savedProduct.gifts.length > 0
    ) {
      console.log(
        "🎁 Free gifts:",
        savedProduct.gifts.map((g) => g.name).join(", ")
      );
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL PRODUCTS
// ======================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email phone")
      .sort({ createdAt: -1 });

    console.log(`📦 Found ${products.length} products in database`);
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// GET PRODUCTS BY SELLER
// ======================================
const getProductsBySeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const products = await Product.find({ seller: sellerId })
      .populate("seller", "name email phone")
      .sort({ createdAt: -1 });

    console.log(`📦 Found ${products.length} products for seller ${sellerId}`);
    res.json(products);
  } catch (error) {
    console.error("Get Seller Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// GET SINGLE PRODUCT
// ======================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email phone"
    );

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

    const imageFile = req.file || req.files?.image?.[0];
    const giftImageFiles = req.files?.giftImages || [];

    if (imageFile) {
      updateData.image = `/uploads/${imageFile.filename}`;
    }

    if (updateData.subcategory !== undefined) {
      updateData.subcategory = String(updateData.subcategory || "").trim();
    }

    if (updateData.price !== undefined) {
      updateData.price = parseFloat(updateData.price);
    }
    if (updateData.stock !== undefined) {
      updateData.stock = parseInt(updateData.stock);
    }
    if (
      updateData.flashSalePrice !== undefined &&
      updateData.flashSalePrice !== null
    ) {
      updateData.flashSalePrice = parseFloat(updateData.flashSalePrice);
    }
    if (
      updateData.flashSaleStock !== undefined &&
      updateData.flashSaleStock !== null
    ) {
      updateData.flashSaleStock = parseInt(updateData.flashSaleStock);
    }
    if (updateData.warrantyMonths !== undefined) {
      updateData.warrantyMonths = parseInt(updateData.warrantyMonths);
    }

    if (updateData.hasFreeGift !== undefined) {
      const freeGiftEnabled =
        updateData.hasFreeGift === true || updateData.hasFreeGift === "true";
      updateData.hasFreeGift = freeGiftEnabled;

      if (!freeGiftEnabled) {
        updateData.gifts = [];
      } else if (updateData.gifts) {
        try {
          const giftsMeta =
            typeof updateData.gifts === "string"
              ? JSON.parse(updateData.gifts)
              : updateData.gifts;

          if (Array.isArray(giftsMeta)) {
            let imageIndex = 0;
            updateData.gifts = giftsMeta
              .filter((g) => g && g.name && String(g.name).trim())
              .map((g) => {
                const gift = {
                  name: String(g.name).trim(),
                  description: g.description
                    ? String(g.description).trim()
                    : "",
                  image: g.image || undefined,
                };
                if (giftImageFiles[imageIndex]) {
                  gift.image = `/uploads/${giftImageFiles[imageIndex].filename}`;
                  imageIndex++;
                }
                return gift;
              });
          }
        } catch (parseErr) {
          console.error("Failed to parse gifts on update:", parseErr);
        }
      }
    }

    if (updateData.gifts !== undefined && !Array.isArray(updateData.gifts)) {
      updateData.gifts = [];
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("seller", "name email phone");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// FLASH SALE UPDATE
// ======================================
const updateFlashSale = async (req, res) => {
  try {
    const {
      isFlashSale,
      flashSalePrice,
      flashSaleStart,
      flashSaleEnd,
      flashSaleStock,
    } = req.body;

    const updateData = {
      isFlashSale: isFlashSale === true || isFlashSale === "true",
    };

    if (updateData.isFlashSale) {
      updateData.flashSalePrice = flashSalePrice
        ? parseFloat(flashSalePrice)
        : null;
      updateData.flashSaleStart = flashSaleStart || null;
      updateData.flashSaleEnd = flashSaleEnd || null;
      updateData.flashSaleStock = flashSaleStock
        ? parseInt(flashSaleStock)
        : null;
    } else {
      updateData.flashSalePrice = null;
      updateData.flashSaleStart = null;
      updateData.flashSaleEnd = null;
      updateData.flashSaleStock = null;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(
      `⚡ Flash sale ${updateData.isFlashSale ? "enabled" : "disabled"} for:`,
      product.name
    );

    res.json({
      success: true,
      message: updateData.isFlashSale
        ? "Flash sale created successfully"
        : "Flash sale ended successfully",
      product,
    });
  } catch (error) {
    console.error("Flash Sale Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// WARRANTY UPDATE
// ======================================
const updateWarranty = async (req, res) => {
  try {
    const { warranty, warrantyMonths } = req.body;

    const hasWarranty =
      warranty === true ||
      warranty === "true" ||
      (warrantyMonths && Number(warrantyMonths) > 0);

    const updateData = {
      warranty: hasWarranty,
      warrantyMonths: hasWarranty ? parseInt(warrantyMonths) || 12 : 0,
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(
      `🛡️ Warranty ${hasWarranty ? "added" : "removed"} for:`,
      product.name
    );

    res.json({
      success: true,
      message: hasWarranty
        ? "Warranty added successfully"
        : "Warranty removed successfully",
      product,
    });
  } catch (error) {
    console.error("Warranty Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// ADD REVIEW
// ======================================
const addReview = async (req, res) => {
  try {
    const { rating, comment, name } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      name: name || "Customer",
      rating: Number(rating) || 5,
      comment: comment || "",
      date: new Date(),
    };

    product.reviews = product.reviews || [];
    product.reviews.push(review);
    await product.save();

    res.json({
      success: true,
      message: "Review added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Review Error:", error);
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
  getProductsBySeller,
  getProductById,
  updateProduct,
  updateFlashSale,
  updateWarranty,
  addReview,
  deleteProduct,
};