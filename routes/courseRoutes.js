// Placeholder content
const express = require('express');
const router = express.Router(); // بنستخدم Router من Express لإنشاء مجموعة من المسارات
const courseController = require('../controllers/courseController'); // استيراد متحكم الكورسات

// تعريف مسارات الكورسات
router.post('/', courseController.createCourse);             // POST /api/courses -> لإنشاء كورس جديد
router.get('/', courseController.getAllCourses);             // GET /api/courses -> لجلب كل الكورسات
router.get('/:id', courseController.getCourseById);          // GET /api/courses/:id -> لجلب كورس واحد بالـ ID
router.put('/:id', courseController.updateCourse);           // PUT /api/courses/:id -> لتحديث كورس بالـ ID
router.delete('/:id', courseController.deleteCourse);        // DELETE /api/courses/:id -> لحذف كورس بالـ ID

module.exports = router; // بنصدر الـ router عشان نقدر نستخدمه في app.js