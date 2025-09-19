const { Theme, Question } = require('../db/models');

class ThemeService {
  static async getAll() {
    return await Theme.findAll({
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['id', 'points']
        }
      ],
      order: [['createdAt', 'ASC']]
    });
  }

  static async getById(id) {
    return await Theme.findByPk(id, {
      include: [
        {
          model: Question,
          as: 'questions',
          order: [['points', 'ASC']]
        }
      ]
    });
  }

}

module.exports = ThemeService;