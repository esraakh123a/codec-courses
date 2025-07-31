const mongoose = require('mongoose');

// تعريف الـ Schema (هيكل البيانات) للدرس
const lessonSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // بيشير لنموذج الـ Course، وده بيربط الدرس بالكورس اللي بينتمي ليه
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: false
    },
    resources: {
        type: [String], // مصفوفة من النصوص (ممكن تكون روابط أو نصوص لمصادر إضافية)
        default: []     // قيمة افتراضية: مصفوفة فارغة لو مفيش مصادر
    },
    duration: {
        type: Number, // المدة بالدقائق
        required: true
    },
    isPreview: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});



module.exports = mongoose.model('Lesson', lessonSchema);