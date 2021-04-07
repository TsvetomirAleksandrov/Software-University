const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send(`Hello world from express`);
});

app.get('/cats/:catId', (req, res) => {
    res.send('some cute cats');
})

app.post('/cats', (req, res) => {
    console.log(`create cat`);
    res.status(201).send(`cat created`);
});

app.listen(5000, () => console.log(`This server is running on port ${port}..`));