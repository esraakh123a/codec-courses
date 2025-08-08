const express = require("express");
const router = express.Router();
const auth = require("../middelware/auth");
const { createEnrollment, getMyEnrollments, updateProgress } = require("../controllers/Enrollment");

// Create enrollment (اشترك في كورس)
router.post("/", auth, createEnrollment);

// Get all my enrollments
router.get("/", auth, getMyEnrollments);

// Update my progress in a course
router.put("/progress", auth, updateProgress);

module.exports = router;