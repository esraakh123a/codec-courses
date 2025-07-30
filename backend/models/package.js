const Package = require("../models/Package");

const createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const saved = await newPackage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPackage }