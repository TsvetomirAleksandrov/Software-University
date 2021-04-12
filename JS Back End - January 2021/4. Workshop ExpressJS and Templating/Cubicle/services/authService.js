const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config');
const User = require('../models/User');

const register = async ({ username, password }) => {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });
};

module.exports = {
    register,
}