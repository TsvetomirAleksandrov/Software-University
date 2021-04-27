const config = {
    PORT: 4000,
    DB_URI: `mongodb://localhost/tut`,
    SALT_ROUNDS: 10,
    SECRET: 'MNOGOQKASOL',
    COOKIE_NAME: 'TOKEN'
};

module.exports = config;