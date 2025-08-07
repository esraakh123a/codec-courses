 
 const Quiz = require('../models/Quiz');//استدعاء(models/Quiz) نموذج الكويز
exports.createQuiz = async (req, res) => {//createQuizإنشاء اختبار جديد
  try {

///const quiz = new Quiz({     //*****
  //...req.body,
 // createdBy: req.user._id   // ربط الكويز بالمستخدم الحالي

    const quiz = new Quiz(req.body);// (req.body) يحتوي على البيانات المرسلة من المستخدم (من خلال POST )
    await quiz.save();//قاعدة البيانات.هنحفظه
    res.status(201).json(quiz);//201  "تم الإنشاء بنجاح"
  } catch (error) {//err
    res.status(400).json({ message: error.message });//400  = Bad Request|اذا حدث خطأ

  }
};
// ********************************************************
// جلب جميع الكويزاتgetALLQuizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    
    // /*****/const quizzes = await Quiz.find().populate('createdBy');//جلب اسم المعلم مع كل كويز  بدل id
    const quizzes = await Quiz.find();//Quiz.find() = يقوم بجلب جميع الكويزات من قاعدة البيانات.
    res.json(quizzes);//res.json(quizzes) = يعرض النتائج للمستخدم بصيغة JSON.
  } catch (error) {
    res.status(500).json({ message: error.message });//إذا حدث خطأ داخلي،
    //  يرجع كود الحالة 500 (يعني Internal Server Error).


  }
};


// **************************************************
// تستخدم populate('createdBy'):

// هذا يُخبر Mongoose أن يستبدل معرف المستخدم (createdBy) بالبيانات الكاملة للمستخدم المرتبط.

// بدل ما يظهر فقط _id، يظهر الاسم والبريد والدور وغيره.

