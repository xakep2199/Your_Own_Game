"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Questions",
      [
        {
          question: "В каком году произошла Куликовская битва?",
          correctAnswer: "1380",
          points: 200,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Кто был первым русским царем?",
          correctAnswer: "Иван IV Грозный",
          points: 400,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "В каком году была основана Москва?",
          correctAnswer: "1147",
          points: 600,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Кто написал "Слово о полку Игореве"?',
          correctAnswer: "Неизвестный автор",
          points: 800,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какая самая длинная река в мире?",
          correctAnswer: "Нил",
          points: 200,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "В какой стране находится гора Эверест?",
          correctAnswer: "Непал",
          points: 400,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой океан самый большой по площади?",
          correctAnswer: "Тихий океан",
          points: 600,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Столица Австралии?",
          correctAnswer: "Канберра",
          points: 800,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Кто написал роман "Война и мир"?',
          correctAnswer: "Лев Толстой",
          points: 200,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "В каком веке жил Александр Пушкин?",
          correctAnswer: "XIX век",
          points: 400,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Кто автор пьесы "Горе от ума"?',
          correctAnswer: "Александр Грибоедов",
          points: 600,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой роман написал Михаил Булгаков?",
          correctAnswer: "Мастер и Маргарита",
          points: 800,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Кто изобрел телефон?",
          correctAnswer: "Александр Белл",
          points: 200,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "В каком году был запущен первый искусственный спутник Земли?",
          correctAnswer: "1957",
          points: 400,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Кто открыл закон всемирного тяготения?",
          correctAnswer: "Исаак Ньютон",
          points: 600,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой элемент имеет химический символ Au?",
          correctAnswer: "Золото",
          points: 800,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "В каком виде спорта используется ракетка?",
          correctAnswer: "Теннис",
          points: 200,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Сколько игроков в футбольной команде на поле?",
          correctAnswer: "11",
          points: 400,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "В каком году состоялись первые Олимпийские игры современности?",
          correctAnswer: "1896",
          points: 600,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Кто является рекордсменом по количеству золотых медалей на Олимпиаде?",
          correctAnswer: "Майкл Фелпс",
          points: 800,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questions", null, {});
  },
};
