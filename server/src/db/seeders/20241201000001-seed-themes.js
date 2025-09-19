"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Themes",
      [
        {
          name: "iPhone и смартфон-революция",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "YouTube и видеоконтент",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Социальные сети",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Популярные цифровые платформы",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "COVID-19 пандемия",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Криптовалюты и блокчейн",
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
