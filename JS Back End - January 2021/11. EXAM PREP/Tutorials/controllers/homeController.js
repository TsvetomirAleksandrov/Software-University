const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

router.get('/', (req, res) => {
    res.render('guest-home');
});

router.get('/secret-action', isAuth, (req, res) => { 
res.send('very verysecret')
});

module.exports = router;