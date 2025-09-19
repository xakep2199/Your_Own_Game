const gameRouter = require('express').Router();
const GameController = require('../controllers/Game.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');


gameRouter
  .get('/question/:themeId/:points', verifyAccessToken, GameController.getQuestion)
  .post('/answer/:questionId', verifyAccessToken, GameController.answerQuestion)
  .get('/stats', verifyAccessToken, GameController.getGameStats);

module.exports = gameRouter;