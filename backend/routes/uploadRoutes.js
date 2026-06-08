const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(
      base64Image,
      {
        folder: "armorcovers",
      }
    );

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
});

module.exports = router;