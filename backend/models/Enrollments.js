const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type:String,     //mongoose.Schema.Types.ObjectId,
    // ref: "Course",
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0, // يبدأ من 0%
    min: 0,
    max: 100
  }
}, { timestamps: true });

const Enrollmentmodule = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollmentmodule;