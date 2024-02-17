const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOptionIndex: Number,
});

module.exports = mongoose.model('Question', questionSchema);
