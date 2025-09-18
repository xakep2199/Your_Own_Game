const gameRouter = require('express').Router();
const ThemeController = require('../controllers/Theme.controller');
const QuestionController = require('../controllers/Question.controller');
const ScoreController = require('../controllers/Score.controller');
const GameController = require('../controllers/Game.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

quizRouter
  .get('/themes', ThemeController.getAll)
  .get('/themes/:id', ThemeController.getById)
  .get('/themes/:id/questions', ThemeController.getQuestions);

quizRouter
  .get('/questions/theme/:themeId', QuestionController.getByTheme);

quizRouter
  .get('/scores', verifyAccessToken, ScoreController.getUserScores)
  .get('/scores/total', verifyAccessToken, ScoreController.getTotalScore)
  .put('/scores/theme/:themeId', verifyAccessToken, ScoreController.updateScore)
  .delete('/scores/theme/:themeId', verifyAccessToken, ScoreController.resetScore)
  .get('/leaderboard', ScoreController.getLeaderboard);

quizRouter
  .get('/game/question/:themeId/:points', verifyAccessToken, GameController.getQuestion)
  .post('/game/answer/:questionId', verifyAccessToken, GameController.answerQuestion)
  .get('/game/stats', verifyAccessToken, GameController.getGameStats);

module.exports = gameRouter;