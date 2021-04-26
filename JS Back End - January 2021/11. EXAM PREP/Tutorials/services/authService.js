const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (username, password) => {
    let user = new User({ username, password });

    return user.save();
}

const login = async (username, password) => {
    let user = await User.findOne({ username });
    if (!user) return Promise.reject({ message: 'No such user', status: 404 });

    let areEqual = await bcrypt.compare(password, user.password)
    if (!areEqual) return Promise.reject({ message: 'Invalid password', status: 404 });

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);
    return user;
}

module.exports = {
    register,
    login,
}