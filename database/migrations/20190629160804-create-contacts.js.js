'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      contactId: {
        type: Sequelize.INTEGER,
        field: 'contact_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'users',
          key: 'id'
        }
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
        tableName: 'contacts',
        uniqueKeys: {
          contacts_unique: {
            fields: ['user_id', 'contact_id']
          }
        }
      })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('contacts');
  }
};
