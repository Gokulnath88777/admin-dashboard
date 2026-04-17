'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attribute_values', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      attribute_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },

      value: {
        type: Sequelize.STRING,
        allowNull: false
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
         deletedAt:Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('attribute_values');
  }
};