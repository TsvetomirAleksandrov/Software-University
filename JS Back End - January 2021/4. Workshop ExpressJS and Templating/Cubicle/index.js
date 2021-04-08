const express = require('express');
const config = require('./config/config');
const app = express();

app.engine('hbs', handlebars({
    extname: 'hbs'
}));

app.set('view engine', hbs);

app.get('/', (req, res) => {
res.send(`It's working!`)
})

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));