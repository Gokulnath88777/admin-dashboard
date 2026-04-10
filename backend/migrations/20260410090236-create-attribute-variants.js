

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attribute_variants', {
      variant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_variants',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      attribute_variantid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attribute_values',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('attribute_variants')
  }
};

