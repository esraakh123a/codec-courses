const express = require('express');// experss 
const router = express.Router();

const quizController = require('../controllers/quizController');
router.post('/', quizController.createQuiz);//// POST: إنشاء كويز

router.get('/', quizController.getAllQuizzes);//// GET: جلب كل الكويزات
// =====================================================================================
// **تعديل

// إنشاء كويز جديد                                         
// router.post('/', quizController.createQuiz);

// // جلب جميع الكويزات
// router.get('/', quizController.getAllQuizzes);

// جلب كويز حسب ID
router.get('/:id', quizController.getQuizById);

// تحديث كويز
router.put('/:id', quizController.updateQuiz);

// حذف كويز
router.delete('/:id', quizController.deleteQuiz);

// =======================================================================================
module.exports = router;
