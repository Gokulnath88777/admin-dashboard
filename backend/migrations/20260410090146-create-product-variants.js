
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable('product_variants',
      {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true
        },
        product_id:
        {
          type: Sequelize.INTEGER,
          references:
          {
            model: 'products',
            key: 'id'
          },
          onDelete:'CASCADE'
        },
        sku_code:
        {
          type:Sequelize.STRING,
          unique: true,
          allowNull: false,

        },
        price: Sequelize.INTEGER,
        discount: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('product_variants')
  }
};
