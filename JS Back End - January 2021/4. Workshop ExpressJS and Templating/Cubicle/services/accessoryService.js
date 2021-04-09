const Accessory = require('../models/Accessory');

function getAll() {
    return Accessory.find().lean();
}

function getAllUnattached() {
    return Accessory.find({ _id: { $nin: ids } }).lean();
}

function create(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

module.exports = {
    create,
    getAll,
    getAllUnattached,
}