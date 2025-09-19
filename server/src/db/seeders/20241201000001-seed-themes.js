"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Themes",
      [
        {
          name: "Программирование и мемы",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dota 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Фильмы и сериалы",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Аниме",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Игры",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Интернет-культура",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Themes", null, {});
  },
};
