const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  percentage: { type: Number, required: true },
  appliesTo: { type: String, enum: ["course", "package", "path"], required: true },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model("Discount", discountSchema);