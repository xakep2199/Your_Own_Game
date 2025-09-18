const QuestionService = require('../services/Question.service');
const formatResponse = require('../utils/formatResponse');

class QuestionController {
  static async getByTheme(req, res) {
    try {
      const { themeId } = req.params;
      const questions = await QuestionService.getByTheme(themeId);

      return res.status(200).json(
        formatResponse(200, 'Вопросы темы успешно получены', questions)
      );
    } catch ({ message }) {
      console.error('======QuestionController.getByTheme===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }



}

module.exports = QuestionController;