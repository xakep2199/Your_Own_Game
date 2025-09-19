const gameRouter = require('express').Router();
const GameController = require('../controllers/Game.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');


gameRouter
  .get('/game/question/:themeId/:points', verifyAccessToken, GameController.getQuestion)
  .post('/game/answer/:questionId', verifyAccessToken, GameController.answerQuestion)
  .get('/game/stats', verifyAccessToken, GameController.getGameStats);

module.exports = gameRouter;