const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const isAuth = require('../middlewares/isAuth');
const isGuest = require('../middlewares/isGuest');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        if (password != repeatPassword) {
            throw { message: 'Passwords doesn\'t match!' };
        }
        await authService.register(username, password);
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
        res.render('register', { title: 'Register', error });
    }
});

router.post('/login', isGuest, (req, res) => {
    try {
        let token = await authService.login(req.body);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('login', { title: 'Login', error });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;