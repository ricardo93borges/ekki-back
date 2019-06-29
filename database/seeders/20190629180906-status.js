'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('status', [
      { name: 'pendent' },
      { name: 'canceled' },
      { name: 'success' },
      { name: 'failed' },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('status', null, {});
  }
};
