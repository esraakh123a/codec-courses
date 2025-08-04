const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discount: Number,
  coursesIncluded: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  isRecommended: { type: Boolean, default: false },
  targetAudience: String,
  validUntil: Date,
});

module.exports = mongoose.model("Package", packageSchema);