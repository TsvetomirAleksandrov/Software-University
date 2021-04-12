const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config');
const User = require('../models/User');

const register = async ({ username, password }) => {
    //TODO: Check if username exists

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });

    return await user.save();
};

const login = async ({ username, password }) => {
    //get user from db
    let user = await User.findOne({ username });

    if (!user) throw { message: 'User not found...' };
    

    //compare password hash

    //generate token
};

module.exports = {
    register,
    login,
}