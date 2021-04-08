const mongoose = require('mongoose');

module.exports = (app) => {
    mongoose.connect('mongodb://localhost/cubicledb', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (err) => console.error(err));
    db.once('open', () => console.log('Db Connected'));
}