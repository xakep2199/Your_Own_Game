const themeRouter = require('express').Router();
const ThemeController = require('../controllers/Theme.controller');

themeRouter
  .get('/themes', ThemeController.getAll)
  .get('/themes/:id', ThemeController.getById)
  .get('/themes/:id/questions', ThemeController.getQuestions);

module.exports = themeRouter;