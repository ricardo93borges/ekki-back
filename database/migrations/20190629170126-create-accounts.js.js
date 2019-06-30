'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      number: {
        type: Sequelize.STRING(8),
        unique: true,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      limit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      },
    },
      {
        underscored: true,
        tableName: 'accounts'
      })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('accounts');
  }
};
