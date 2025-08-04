const Discount = require("../models/Discount");

const createDiscount = async (req, res) => {
  try {
    const discount = new Discount(req.body);
    const saved = await discount.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDiscount, getAllDiscounts };