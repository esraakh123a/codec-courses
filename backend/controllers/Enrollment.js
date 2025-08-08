const Enrollmentmodule = require("../models/Enrollments");

// Create new enrollment
const createEnrollment = async (req, res) => {
  try {
    const userId = req.user.id; // جاي من التوكن
    const { courseId } = req.body;

    // تأكد المستخدم مش مسجل في الكورس قبل كده
    const existing = await Enrollmentmodule.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = new Enrollmentmodule({ userId, courseId });
    await enrollment.save();

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enrollments for logged-in user
const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollmentmodule.find({ userId })
      .populate("courseId", "title description") // هيرجع بيانات الكورس
      .populate("userId", "name email");         // لو عايزة ترجع بيانات المستخدم كمان

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update progress
const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, progress } = req.body;

    const enrollment = await Enrollmentmodule.findOneAndUpdate(
      { userId, courseId },
      { progress },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json({ message: "Progress updated", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEnrollment, getMyEnrollments, updateProgress };