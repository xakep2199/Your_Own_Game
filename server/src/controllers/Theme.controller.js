const ThemeService = require('../services/Theme.service');
const formatResponse = require('../utils/formatResponse');

class ThemeController {
  static async getAll(req, res) {
    try {
      const themes = await ThemeService.getAll();
      
      return res.status(200).json(
        formatResponse(200, 'Темы успешно получены', themes)
      );
    } catch ({ message }) {
      console.error('======ThemeController.getAll===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const theme = await ThemeService.getById(id);

      if (!theme) {
        return res.status(404).json(
          formatResponse(404, 'Тема не найдена', null, 'Тема не найдена')
        );
      }

      return res.status(200).json(
        formatResponse(200, 'Тема успешно получена', theme)
      );
    } catch ({ message }) {
      console.error('======ThemeController.getById===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }


  static async getQuestions(req, res) {
    try {
      const { id } = req.params;
      const questions = await ThemeService.getQuestionsByTheme(id);

      return res.status(200).json(
        formatResponse(200, 'Вопросы темы успешно получены', questions)
      );
    } catch ({ message }) {
      console.error('======ThemeController.getQuestions===\n', message);
      res.status(500).json(
        formatResponse(500, 'Внутренняя ошибка сервера', null, message)
      );
    }
  }
}

module.exports = ThemeController;
