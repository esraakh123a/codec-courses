const Result = require('../models/Result');

// إضافة نتيجة جديدة(حفظ نتيجة جديدة)
exports.createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });//400 
  }
};

// جلب كل النتائج
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('user', 'name email')
      .populate('quiz', 'title');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// جلب نتائج مستخدم معين)( لوحة الطالب )
exports.getResultsByUser = async (req, res) => {
  try {
    const results = await Result.find({ user: req.params.userId })
      .populate('quiz', 'title');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//populale  