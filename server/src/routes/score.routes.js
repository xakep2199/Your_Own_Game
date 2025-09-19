const scoreRouter = require('express').Router();
const ScoreController = require('../controllers/Score.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

scoreRouter
  .get('/scores', verifyAccessToken, ScoreController.getUserScores)
  .get('/scores/total', verifyAccessToken, ScoreController.getTotalScore)
  .put('/scores/theme/:themeId', verifyAccessToken, ScoreController.updateScore)
  .delete('/scores/theme/:themeId', verifyAccessToken, ScoreController.resetScore)
    .get('/leaderboard', ScoreController.getLeaderboard);

module.exports = scoreRouter;