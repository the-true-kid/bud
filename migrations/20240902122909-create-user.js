'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {  // Use snake_case for table name
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      location: {
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
    await queryInterface.dropTable('users');  // Use snake_case for table name
  }
};
