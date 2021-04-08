const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs');

let productsData = require('../config/database.json');

function getOne(id) {
    return productsData.find(x => x.id == id);
}

function getAll() {
    return productsData;
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);

    fs.writeFile(__dirname + '/../config/database.json', JSON.stringify(productsData), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {
    getOne,
    getAll,
    create
}