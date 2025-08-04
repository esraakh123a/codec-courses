const checkDiscountData = (req, res, next) => {
  if (!req.body.code || !req.body.percentage) {
    return res.status(400).json({ message: "Code and Percentage are required" });
  }
  next();
};

module.exports = checkDiscountData;