const questionRouter = require('express').Router();
const QuestionController = require('../controllers/Question.controller');

questionRouter
  .get('/questions/theme/:themeId', QuestionController.getByTheme);

module.exports = questionRouter;