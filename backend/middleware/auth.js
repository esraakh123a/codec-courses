const jwt =require("jsonwebtoken");

const auth = (req, res, next) => {
  // 1. استقبل الهيدر
  const authHeader = req.header("Authorization");

  // 2. لو مش موجود
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  // 3. شيل كلمة Bearer لو موجودة
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    // 4. فك التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. خزّن البيانات في req علشان نستخدمها بعدين
    req.user = decoded; // فيه id و role زي ما انتي عاملة في generateToken

    // 6. كمل للراوت اللي بعده
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = auth;