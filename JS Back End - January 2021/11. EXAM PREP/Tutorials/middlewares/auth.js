const { COOKIE_NAME, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME];

    if (token) {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                res.clearCookie(COOKIE_NAME);
            } else {
                req.user = decoded;
                req.locals.user = decoded;
                req.locals.isAuth = true;
            }
        });
    }

    next();
}

module.exports = auth;