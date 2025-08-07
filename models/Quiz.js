
// ======================================================================
const mongoose=require("mongoose")  ///mongooseاستدعي 
// اعمل ال Schema
const quizSchema=new mongoose.Schema({
titel:{
type:String,
required:true,
},description:String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],//

  createdAt: {
     type: Date,
     default: Date.now }

});
//  يمكنك استخدامه في ملفات أخرى داخل المشروع.module.exports
module.exports=mongoose.model("Quiz",quizSchema);

//هذا السطر يُستخدم داخل quizSchema ويعبّر عن علاقة بين اختبار
// (Quiz) ومستخدم (User)، وتحديدًا "من أنشأ هذا الاختبار؟".










// نموذج اسمهQuiz بناءً على الـ Schema الذي أنشأته.mongoose.model("Quiz",quizSchema);

//  مثال واقعي
// لو نفترض أنك تطوّر تطبيقًا تعليميًا فيه اختبارات، فهذا 
// الملف ينشئ نموذجًا يُخزّن كل اختبار
//  داخل قاعدة البيانات، ويتضمن العنوان والوصف والأسئلة المرتبطة به.