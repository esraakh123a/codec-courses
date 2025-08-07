const express = require('express');
const router = express.Router();

const resultController = require('../controllers/resultController');

// إضافة نتيجة جديدة---// إرسال نتيجة

router.post('/', resultController.createResult);

// جلب كل النتائج
router.get('/', resultController.getAllResults);

// جلب نتائج مستخدم معين حسب اليوزر ID =neme
router.get('/user/:userId', resultController.getResultsByUser);
// router.get('/student/:name', resultController.getResultsByStudent);

module.exports = router;
