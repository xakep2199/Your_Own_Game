'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      Theme.hasMany(models.Question, {
        foreignKey: 'themeId',
        as: 'questions'
      });
      Theme.hasMany(models.UserScore, {
        foreignKey: 'themeId',
        as: 'userScores'
      });
    }
  }
  Theme.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Theme'
    }
  );

  return Theme;
};