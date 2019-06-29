'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'account_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }).then(() => {
      return queryInterface.addColumn('transfers', 'status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'statuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    }).then(() => {
      return queryInterface.addColumn('transfers', 'from_account_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    }).then(() => {
      return queryInterface.addColumn('transfers', 'to_account_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    })

  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'account_id')
      .then(() => queryInterface.removeColumn('transfers', 'status_id'))
      .then(() => queryInterface.removeColumn('transfers', 'from_account_id'))
      .then(() => queryInterface.removeColumn('transfers', 'to_account_id'))
  }
};
