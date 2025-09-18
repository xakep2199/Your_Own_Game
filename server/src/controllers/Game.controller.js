const QuestionService = require('../services/Question.service');
const ScoreService = require('../services/Score.service');
const formatResponse = require('../utils/formatResponse');

class GameController {

  static async getQuestion(req, res) {
    try {
      const { themeId, points } = req.params;
      const pointsNumber = parseInt(points);

      const question = await QuestionService.getRandomByThemeAndPoints(themeId, pointsNumber);

      if (!question) {
        return res.status(404).json(
          formatResponse(404, 'Вопрос не найден', null, 'Вопрос с такими параметрами не найден')
        );
      }

      return res.status(200).json(
        formatResponse(200, 'Вопрос получен', question)
      );
    } catch ({ message }) {
      console.error('======GameController.getQuestion===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }

  static async answerQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;
      const { user } = req;

      if (!answer || typeof answer !== 'string') {
        return res.status(400).json(
          formatResponse(400, 'Ответ не может быть пустым', null, 'Ответ не может быть пустым')
        );
      }

      const result = await QuestionService.checkAnswer(questionId, answer);
      
      if (result.correct) {
        const question = await QuestionService.getById(questionId);
        if (question) {
          await ScoreService.updateUserScore(user.id, question.themeId, result.points);
        }
      }

      return res.status(200).json(
        formatResponse(200, 'Ответ обработан', result)
      );
    } catch ({ message }) {
      console.error('======GameController.answerQuestion===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }

  static async getGameStats(req, res) {
    try {
      const { user } = req;

      const userScores = await ScoreService.getUserScores(user.id);
      const totalScore = await ScoreService.getTotalUserScore(user.id);

      return res.status(200).json(
        formatResponse(200, 'Статистика игры получена', { totalScore, allScores: userScores })
      );
    } catch ({ message }) {
      console.error('======GameController.getGameStats===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }
}

module.exports = GameController;