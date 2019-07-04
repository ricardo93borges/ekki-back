'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('statuses', [
      { name: 'Concluida' },
      { name: 'Cancelada' }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
