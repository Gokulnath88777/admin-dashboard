'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
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

      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('images');
  }
};