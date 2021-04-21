const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Auth controller');
});

module.exports = router;