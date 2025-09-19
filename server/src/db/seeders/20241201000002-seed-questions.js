"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Questions",
      [
        {
          question: "Что означает аббревиатура 'YAGNI' в программировании?",
          correctAnswer: "You Aren't Gonna Need It",
          points: 200,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Какой язык программирования создал Брендан Айк за 10 дней?",
          correctAnswer: "JavaScript",
          points: 400,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Что означает мем 'Hello World' в программировании?",
          correctAnswer: "Первая программа, которую пишут новички",
          points: 600,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Какой знаменитый баг в игре 'Space Invaders' сделал игру сложнее?",
          correctAnswer: "Ускорение игры при уничтожении врагов",
          points: 800,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой герой в Dota 2 стал мемом из-за фразы 'CYKA BLYAT'?",
          correctAnswer: "Pudge",
          points: 200,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой стример Dota 2 известен фразой 'EZ MID'?",
          correctAnswer: "Gorgc",
          points: 400,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой герой стал мемом из-за способности 'Black Hole'?",
          correctAnswer: "Enigma",
          points: 600,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Какой предмет в Dota 2 стал мемом из-за фразы 'Buy BKB'?",
          correctAnswer: "Black King Bar",
          points: 800,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "В каком фильме главный герой говорит 'Я вернусь'?",
          correctAnswer: "Терминатор",
          points: 200,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Как называется сериал о драконе и короле?",
          correctAnswer: "Игра престолов",
          points: 400,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Кто снял фильм 'Криминальное чтиво'?",
          correctAnswer: "Квентин Тарантино",
          points: 600,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "В каком сериале главный герой - учитель химии, который стал наркобароном?",
          correctAnswer: "Во все тяжкие",
          points: 800,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Как называется аниме о мальчике-ниндзя с демоном внутри?",
          correctAnswer: "Наруто",
          points: 200,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "В каком аниме главный герой - самурай с мечом, который может резать все?",
          correctAnswer: "Блич",
          points: 400,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Как называется аниме о мальчике, который становится пиратом?",
          correctAnswer: "Ван Пис",
          points: 600,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "В каком аниме главный герой - мальчик с призраком-помощником?",
          correctAnswer: "Токийский гуль",
          points: 800,
          themeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "В какой игре главный герой - сокол, который спасает принцессу?",
          correctAnswer: "The Legend of Zelda",
          points: 200,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Как называется игра, где нужно строить города и управлять ресурсами?",
          correctAnswer: "SimCity",
          points: 400,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "В какой игре главный герой - охотник на монстров?",
          correctAnswer: "Monster Hunter",
          points: 600,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Как называется игра, где нужно выживать в мире зомби?",
          correctAnswer: "Left 4 Dead",
          points: 800,
          themeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Что означает аббревиатура 'LOL' в интернете?",
          correctAnswer: "Laugh Out Loud",
          points: 200,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Как называется мем с котиком, который говорит 'I can has cheezburger'?",
          correctAnswer: "Lolcat",
          points: 400,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: "Что означает фраза 'Rickroll' в интернете?",
          correctAnswer: "Обман с ссылкой на песню Rick Astley",
          points: 600,
          themeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            "Как называется мем с собакой, которая сидит в горящей комнате?",
          correctAnswer: "This is fine",
          points: 800,
          themeId: 6,
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
