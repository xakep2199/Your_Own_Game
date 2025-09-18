'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Theme, {
        foreignKey: 'themeId',
        as: 'theme'
      });
    }
  }
  Question.init(
    {
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[200, 400, 600, 800]]
        }
      },
      themeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Themes',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Question'
    }
  );

  return Question;
};