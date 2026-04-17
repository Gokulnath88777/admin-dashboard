'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_variants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        },
      },

      sku_code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      discount: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt:Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_variants');
  }
};