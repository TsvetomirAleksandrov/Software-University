const express = require('express');
require('./config/mongoose');
const { PORT } = require('./config/config');

const app = express();


app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));