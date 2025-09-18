const { UserScore, User, Theme } = require('../db/models');

class ScoreService {
  static async getUserScores(userId) {
    return await UserScore.findAll({
      where: { userId },
      include: [
        {
          model: Theme,
          as: 'theme',
          attributes: ['id', 'name']
        }
      ],
      order: [['score', 'DESC']]
    });
  }

  static async updateUserScore(userId, themeId, points) {
    const [userScore, created] = await UserScore.findOrCreate({
      where: { userId, themeId },
      defaults: { score: 0 }
    });

    const newScore = userScore.score + points;
    await userScore.update({ score: newScore });

    return userScore;
  }

  static async resetUserScore(userId, themeId) {
    const userScore = await UserScore.findOne({
      where: { userId, themeId }
    });

    if (!userScore) {
      return null;
    }

    await userScore.update({ score: 0 });
    return userScore;
  }

  static async getLeaderboard(themeId, limit = 10) {
    return await UserScore.findAll({
      where: themeId ? { themeId } : {},
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username']
        },
        {
          model: Theme,
          as: 'theme',
          attributes: ['id', 'name']
        }
      ],
      order: [['score', 'DESC']],
      limit
    });
  }

  static async getTotalUserScore(userId) {
    const scores = await UserScore.findAll({
      where: { userId },
      attributes: ['score']
    });

    return scores.reduce((total, score) => total + score.score, 0);
  }
}

module.exports = ScoreService;