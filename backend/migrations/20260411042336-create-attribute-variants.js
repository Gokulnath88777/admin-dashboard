'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attribute_variants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      variant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_variants',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      attribute_value_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attribute_values',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

      },


    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('attribute_variants');
  }
};