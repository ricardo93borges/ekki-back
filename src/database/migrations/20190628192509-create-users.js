'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
      email: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      cpf: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(11),
      },
      phone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(11),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.literal('NOW()')
      },
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users')
  }
};
