const router = require('express').Router();
const formatResponse = require('../utils/formatResponse');
const authRoutes = require('./auth.routes');
const gameRouter = require('./game.routes');
const themeRouter = require('./theme.routes');
const questionRouter = require('./question.routes');
const scoreRouter = require('./score.routes');


router.use('/auth', authRoutes);
router.use('/game',gameRouter )
router.use('/themes',themeRouter )
router.use('/questions',questionRouter )
router.use('/score',scoreRouter )


router.use((req, res) => {
  res
    .status(404)
    .json(formatResponse(404, 'Маршрут не найден', null, 'Маршрут не найден'));
});

module.exports = router;
