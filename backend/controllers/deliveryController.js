const Rider = require("../models/Rider");
const User = require("../models/User");

// Register Rider
const registerRider = async (req, res) => {
  try {
    const { fullName, phone, bikePlate, subCounty } = req.body;
    const userId = req.user.id;

    const existing = await Rider.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: "Already registered" });

    const rider = new Rider({
      user: userId,
      fullName,
      phone,
      bikePlate,
      subCounty,
      idCopy: req.files?.idCopy ? req.files.idCopy[0].path : null,
      license: req.files?.license ? req.files.license[0].path : null,
      passportPhoto: req.files?.passportPhoto ? req.files.passportPhoto[0].path : null,
    });

    await rider.save();
    res.status(201).json({ success: true, message: "Rider registered", rider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Rider Profile
const getRiderProfile = async (req, res) => {
  try {
    const rider = await Rider.findOne({ user: req.params.id }).populate('user');
    if (!rider) return res.status(404).json({ message: "Rider not found" });
    res.json(rider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerRider,
  getRiderProfile,
};