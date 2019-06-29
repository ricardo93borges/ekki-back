const users = require('./users');
const contacts = require('./contacts');
const transactions = require('./transactions');

module.exports = (app) => {
    app.use('/users', users);
    app.use('/contacts', contacts);
    app.use('/transactions', transactions);
}