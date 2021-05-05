const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('createCourse');
})

module.exports = router;