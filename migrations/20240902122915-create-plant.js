'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plants', {  // Use snake_case for table name
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      scientific_name: {
        type: Sequelize.STRING
      },
      care_info: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.STRING
      },
      created_at: {  // Use snake_case for timestamps
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {  // Use snake_case for timestamps
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plants');  // Use snake_case for table name
  }
};
