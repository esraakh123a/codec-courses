const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController'); // استيراد متحكم الدروس
///////////////////////////////////kkkkkkkkkkk



router.post('/', lessonController.createLesson);                                  // POST /api/lessons -> لإنشاء درس جديد
router.get('/', lessonController.getAllLessons);                                  // GET /api/lessons -> لجلب كل الدروس (ممكن بفلتر courseId)
router.get('/:id', lessonController.getLessonById);                               // GET /api/lessons/:id -> لجلب درس واحد بالـ ID
router.put('/:id', lessonController.updateLesson);                                // PUT /api/lessons/:id -> لتحديث درس بالـ ID
router.delete('/:id', lessonController.deleteLesson);                             // DELETE /api/lessons/:id -> لحذف درس بالـ ID
router.get('/course/:courseId', lessonController.getLessonsByCourse);             // GET /api/lessons/course/:courseId -> لجلب كل دروس كورس معين

module.exports = router;