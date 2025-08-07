// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: {
     type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String,
 required: true },
  options: [String],
  correctAnswer: { 
type: String,
 required: true }
});

module.exports = mongoose.model('Question', questionSchema);
