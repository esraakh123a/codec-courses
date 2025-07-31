// Placeholder content
const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true    
    },
    description: {
        type: String,
        required: true
    },
    instructorID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // بيشير لنموذج الـ 'Category' (لو موجود عندك نموذج للفئات في المستقبل)
        required: false
    },
    price: {
        type: [String], // مصفوفة من النصوص (ممكن تكون "free", "paid" وهكذا)
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'], // بيحدد القيم المسموح بيها للحقل ده
        required: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    estimatedDuration: {
        type: Number, // المدة بالساعات
        required: true
    },
    coverImageURL: {
        type: String,
        required: false // ممكن يكون إجباري أو اختياري حسب متطلباتك
    },
    dateCreated: {
        type: Date,
        default: Date.now // القيمة الافتراضية هي تاريخ ووقت الإنشاء الحالي
    }
}, {
    timestamps: true // بيضيف حقلين تلقائيًا: createdAt (وقت الإنشاء) و updatedAt (وقت آخر تعديل)
});

// بنصدر النموذج عشان نقدر نستخدمه في أجزاء تانية من التطبيق
module.exports = mongoose.model('Course', courseSchema);