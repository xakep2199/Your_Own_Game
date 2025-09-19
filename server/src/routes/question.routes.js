const questionRouter = require('express').Router();
const QuestionController = require('../controllers/Question.controller');

questionRouter
  .get('/theme/:themeId', QuestionController.getQuestionsByTheme);

module.exports = questionRouter;