

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable('images', {
      id:
      {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      varient_id:
      {
        type: Sequelize.INTEGER,
        references:
        {
          model: 'product_variants',
          key: 'id'
        },
        onDelete:'CASCADE'
      },
       image_url:
      {
        type: Sequelize.STRING,
        allowNull: false
      }

    })
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('images')
  }
};
