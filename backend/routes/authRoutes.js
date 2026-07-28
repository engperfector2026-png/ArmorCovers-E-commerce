const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ====================== UPLOAD SETUP ======================
const uploadDir = path.join(__dirname, "../uploads/seller-docs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|pdf|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error("Only images and PDF files are allowed"));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

const sellerDocsUpload = upload.fields([
  { name: "passport", maxCount: 1 },
  { name: "kraCertificate", maxCount: 1 },
  { name: "nationalIdFront", maxCount: 1 },
  { name: "nationalIdBack", maxCount: 1 },
  { name: "sellingLicence", maxCount: 1 },
]);

// ====================== REGISTER ======================
router.post(
  "/register",
  (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      return sellerDocsUpload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        next();
      });
    }
    next();
  },
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required",
        });
      }

      const existing = await User.findOne({
        email: email.toLowerCase().trim(),
      });

      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role === "seller" || role === "vendor" ? "seller" : "buyer",
      };

      // ===== SELLER DOCUMENTS → paths saved in MongoDB =====
      if (userData.role === "seller") {
        const files = req.files || {};

        if (
          !files.passport?.[0] ||
          !files.kraCertificate?.[0] ||
          !files.nationalIdFront?.[0] ||
          !files.nationalIdBack?.[0] ||
          !files.sellingLicence?.[0]
        ) {
          return res.status(400).json({
            message:
              "All seller documents are required (passport, KRA certificate, national ID front & back, selling licence)",
          });
        }

        userData.documents = {
          passport: `/uploads/seller-docs/${files.passport[0].filename}`,
          kraCertificate: `/uploads/seller-docs/${files.kraCertificate[0].filename}`,
          nationalIdFront: `/uploads/seller-docs/${files.nationalIdFront[0].filename}`,
          nationalIdBack: `/uploads/seller-docs/${files.nationalIdBack[0].filename}`,
          sellingLicence: `/uploads/seller-docs/${files.sellingLicence[0].filename}`,
        };

        userData.isVerified = false;
        userData.verificationStatus = "pending";
      } else {
        userData.isVerified = true;
        userData.verificationStatus = "approved";
      }

      const user = await User.create(userData);

      res.status(201).json({
        success: true,
        message:
          user.role === "seller"
            ? "Seller registered successfully. Documents saved. Awaiting verification."
            : "Registration successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          verificationStatus: user.verificationStatus,
          documents: user.documents || null,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({
        message: error.message || "Registration failed",
      });
    }
  }
);

// ====================== LOGIN ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "armorcovers_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        documents: user.documents || null,
        photo: user.photo || user.avatar || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// ====================== GET CURRENT USER ======================
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "armorcovers_secret"
    );

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get me error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
});

module.exports = router;