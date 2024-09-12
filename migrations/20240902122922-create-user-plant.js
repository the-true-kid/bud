'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_plants', { // Use snake_case for table name
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: { // Snake_case for column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Snake_case for referenced table name
          key: 'id'
        },
        onDelete: 'CASCADE'  // Cascade delete when user is deleted
      },
      plant_id: { // Snake_case for column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plants',  // Snake_case for referenced table name
          key: 'id'
        },
        onDelete: 'NO ACTION'  // No cascade behavior for plants
      },
      nickname: {
        type: Sequelize.STRING
      },
      last_watered: {
        type: Sequelize.DATE
      },
      watering_interval: {
        type: Sequelize.INTEGER
      },
      custom_care_info: {
        type: Sequelize.TEXT
      },
      created_at: { // Snake_case for timestamps
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: { // Snake_case for timestamps
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_plants'); // Use snake_case for table name
  }
};
