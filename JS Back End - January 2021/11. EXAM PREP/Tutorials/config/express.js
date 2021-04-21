const hbs = require('express-handlebars');

module.exports = function (app) {
    app.engine('hbs', hbs({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');
};