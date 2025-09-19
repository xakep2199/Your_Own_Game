const themeRouter = require('express').Router();
const ThemeController = require('../controllers/Theme.controller');

themeRouter
  .get('/', ThemeController.getAll)
  .get('/:id', ThemeController.getById)
  .get('/:id/questions', ThemeController.getQuestions);

module.exports = themeRouter;