const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { password, repeatPassword, username } = req.body;

    if (password !== repeatPassword) {
        res.render('register', { message: 'Password mismatch!' });
        return;
    }

    try {
        await authService.register({ username, password });
        res.redirect('/products');
    } catch (error) {
        res.render('register', { error });
    }
});

module.exports = router;