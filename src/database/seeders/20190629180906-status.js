'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('statuses', [
      { name: 'pendent' },
      { name: 'canceled' },
      { name: 'success' },
      { name: 'failed' },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
