const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz-contoller');

router.get('/', quizController.getQuizQuestion);

module.exports = router;
