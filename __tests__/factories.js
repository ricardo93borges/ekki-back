const faker = require("faker");
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");
const { Account } = require("../src/app/models");
const { Status } = require("../src/app/models");

factory.define("Account", Account, {
    number: Math.floor(10000000 + Math.random() * 900000),
    balance: 1000,
    limit: 500
});

factory.define("User", User, {
    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
    email: faker.internet.email(),
    password: "abcd1234",
    cpf: Math.floor(10000000000 + Math.random() * 900000),
    phone: Math.floor(5111111111 + Math.random() * 900000),
    account_id: 1
});

factory.define("Status", Status, {
    name: 'success'
});

module.exports = factory;