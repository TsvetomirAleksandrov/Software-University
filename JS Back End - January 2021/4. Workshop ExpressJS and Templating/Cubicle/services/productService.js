const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs/promises');

let productsData = require('../config/database.json');

function getOne(id) {
    return productsData.find(x => x.id == id);
}

function getAll(query) {
    let result = productsData;

    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        result = result.filter(x => Number(x.level) >= query.from);
    }

    if (query.to) {
        result = result.filter(x => Number(x.level) <= query.to);
    }

    return result;
}

function create(data, callback) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);

    // fs.writeFile(__dirname + '/../config/database.json', JSON.stringify(productsData), callback);

    return fs.writeFile(__dirname + '/../config/database.json', JSON.stringify(productsData))
}

module.exports = {
    getOne,
    getAll,
    create
}