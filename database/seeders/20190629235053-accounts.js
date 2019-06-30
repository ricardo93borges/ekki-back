'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let objects = []
    for (let i = 1; i <= 20; i++)
      objects.push({
        number: Math.floor(10000000 + Math.random() * 900000),
        balance: 1000,
        limit: 500,
        created_at: Date.now(),
        updated_at: Date.now()
      })

    return queryInterface.bulkInsert('accounts', objects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
