const ScoreService = require('../services/Score.service');
const formatResponse = require('../utils/formatResponse');

class ScoreController {
  static async getUserScores(req, res) {
    try {
      const { user } = res.locals;
      const scores = await ScoreService.getUserScores(user.id);

      return res.status(200).json(
        formatResponse(200, 'Очки пользователя получены', scores)
      );
    } catch ({ message }) {
      console.error('======ScoreController.getUserScores===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }
  static async updateScore(req, res) {
    try {
      const { user } = res.locals;
      const { themeId } = req.params;
      const { points } = req.body;

      if (typeof points !== 'number' || points < 0) {
        return res.status(400).json(
          formatResponse(400, 'Некорректные очки', null, 'Очки должны быть неотрицательным числом')
        );
      }

      await ScoreService.updateUserScore(user.id, themeId, points);
      return res.status(200).json(
        formatResponse(200, 'Очки успешно обновлены')
      );
    } catch ({ message }) {
      console.error('======ScoreController.updateScore===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }

  static async resetScore(req, res) {
    try {
      const { user } = res.locals;
      const { themeId } = req.params;
      const userScore = await ScoreService.resetUserScore(user.id, themeId);

      if (!userScore) {
        return res.status(404).json(
          formatResponse(404, 'Очки по теме не найдены', null, 'Очки по теме не найдены')
        );
      }

      return res.status(200).json(
        formatResponse(200, 'Очки по теме сброшены', userScore)
      );
    } catch ({ message }) {
      console.error('======ScoreController.resetScore===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }

  static async getLeaderboard(req, res) {
    try {
      const { themeId } = req.query;
      const limit = parseInt(req.query.limit) || 10;
      const leaderboard = await ScoreService.getLeaderboard(themeId, limit);
      return res.status(200).json(
        formatResponse(200, 'Таблица лидеров получена', leaderboard)
      );
    } catch ({ message }) {
      console.error('======ScoreController.getLeaderboard===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }
  static async getTotalScore(req, res) {
    try {
      const { user } = res.locals;
      const totalScore = await ScoreService.getTotalUserScore(user.id);
      return res.status(200).json(
        formatResponse(200, 'Общий счет пользователя получен', { totalScore })
      );
    } catch ({ message }) {
      console.error('======ScoreController.getTotalScore===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }
}

module.exports = ScoreController;
