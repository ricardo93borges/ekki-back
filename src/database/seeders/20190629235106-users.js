'use strict';

var faker = require('faker');

module.exports = {
  up: (queryInterface) => {
    let objects = []

    for (let i = 1; i <= 20; i++)
      objects.push({
        name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        email: faker.internet.email(),
        password: "abcd1234",
        cpf: Math.floor(10000000000 + Math.random() * 900000),
        phone: Math.floor(5111111111 + Math.random() * 900000),
        account_id: i,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })

    return queryInterface.bulkInsert('users', objects, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
