const { COOKIE_NAME, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME];

    if (token) {

    }

    next();
}