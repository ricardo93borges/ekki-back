'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false,
      }
    },
      {
        underscored: true,
        tableName: 'statuses'
      })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('statuses');
  }
};
