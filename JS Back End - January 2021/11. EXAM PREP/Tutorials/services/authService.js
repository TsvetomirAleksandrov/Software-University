const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (username, password) => {
    let user = new User({ username, password });

    return user.save();
}

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw { message: 'No such user', status: 404 };

    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) throw { message: 'Invalid password', status: 404 };

    const token = jwt.sign({ _id: user._id, username: user.username }, SECRET);
    return token;
}

module.exports = {
    register,
    login,
}