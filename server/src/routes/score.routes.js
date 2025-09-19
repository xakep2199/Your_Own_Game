const scoreRouter = require('express').Router();
const ScoreController = require('../controllers/Score.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

scoreRouter
  .get('/', verifyAccessToken, ScoreController.getUserScores)
  .get('/total', verifyAccessToken, ScoreController.getTotalScore)
  .put('/theme/:themeId', verifyAccessToken, ScoreController.updateScore)
  .delete('/theme/:themeId', verifyAccessToken, ScoreController.resetScore)
    .get('/leaderboard', ScoreController.getLeaderboard);

module.exports = scoreRouter;