const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { COOKIE_NAME } = require('../config/config');

const authService = require('../services/authService');

router.get('/', (req, res) => {
    res.send('Auth controller');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true })
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    const { username, password, repeatPassword } = req.body;

    if (password != repeatPassword) {
        res.render('register', { error: { message: 'Password should match!' } })
        return;
    }

    authService.register(username, password)
        .then(createdUser => {
            console.log('createdUser');
            console.log(createdUser);
            res.redirect('/auth/login');
        })
        .catch(next)
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;