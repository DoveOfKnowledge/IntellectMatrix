const Question = require('../models/question-model');

//db

exports.getQuizQuestion = async (req, res) => {
  try {
    const question = await Question.findOne();
    if (!question) {
      return res.status(404).json({ message: 'No questions available.' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
