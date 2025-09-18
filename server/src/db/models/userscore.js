'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserScore extends Model {
    static associate(models) {
      UserScore.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      UserScore.belongsTo(models.Theme, {
        foreignKey: 'themeId',
        as: 'theme'
      });
    }
  }
  UserScore.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      themeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Themes',
          key: 'id'
        }
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      }
    },
    {
      sequelize,
      modelName: 'UserScore',
      indexes: [
        {
          unique: true,
          fields: ['userId', 'themeId']
        }
      ]
    }
  );

  return UserScore;
};