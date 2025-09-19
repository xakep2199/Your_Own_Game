"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Themes",
      [
        {
          name: "История России",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "География",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Литература",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Наука и технологии",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Спорт",
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
