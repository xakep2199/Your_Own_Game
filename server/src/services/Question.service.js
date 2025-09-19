const { Question, Theme } = require('../db/models');

class QuestionService {

  static async getRandomByThemeAndPoints(themeId, points) {
    const questions = await Question.findAll({
      where: { 
        themeId,
        points 
      },
      include: [
        {
          model: Theme,
          as: 'theme',
          attributes: ['id', 'name']
        }
      ]
    });
    
    if (questions.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  static async getById(id) {
    return await Question.findByPk(id, {
      include: [
        {
          model: Theme,
          as: 'theme',
          attributes: ['id', 'name']
        }
      ]
    });
  }
  static async getQuestionsByTheme(themeId) {
    return await Question.findAll({
      where: { themeId },
      order: [['points', 'ASC']]
    });
  }

  static async checkAnswer(questionId, userAnswer) {
    const question = await Question.findByPk(questionId);
    if (!question) {
      return { correct: false, points: 0 };
    }

    const isCorrect = question.correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
    return {
      correct: isCorrect,
      points: isCorrect ? question.points : 0
    };
  }
}

module.exports = QuestionService;