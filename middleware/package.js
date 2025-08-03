const checkPackageData = (req, res, next) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({ message: "Title and Price are required" });
  }
  next();
};

module.exports = checkPackageData;