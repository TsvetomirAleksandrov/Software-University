const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const authController = require('./controllers/courseController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/create', courseController);

module.exports = router;