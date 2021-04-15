const mongoose = require('mongoose');
const config = require('./index');

module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (err) => console.error(err));
    db.once('open', () => console.log('Db Connected'));

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', true);
    mongoose.set('useCreateIndex', true);
}