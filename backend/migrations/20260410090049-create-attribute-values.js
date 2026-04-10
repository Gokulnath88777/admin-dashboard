

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attribute_values',
      {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
        ,
        attribute_id:
        {
          type: Sequelize.INTEGER,
          references:
          {
            model: 'attributes',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        value: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    )
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropDatabase('attribute_value')
  }
};
