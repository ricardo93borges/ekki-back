'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(13),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
};
