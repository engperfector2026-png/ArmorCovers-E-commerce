const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ======================================
// REGISTER USER
// ======================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'customer'
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful! You can now login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

// ======================================
// LOGIN USER
// ======================================
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log("📥 Login Attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    console.log("✅ User found:", user.email, "| Role:", user.role);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'armorcovers_super_secret_key_2026',
      { expiresIn: '7d' }
    );

    console.log("✅ Login Successful for:", email);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};