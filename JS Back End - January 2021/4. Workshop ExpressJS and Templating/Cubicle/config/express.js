const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

function setupExpress(app) {
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));
}

module.exports = setupExpress;