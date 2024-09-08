'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPlants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Reference to the Users table
          key: 'id'
        },
        onDelete: 'CASCADE'  // Cascade delete when user is deleted
      },
      plant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Plants',  // Reference to the Plants table
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPlants');
  }
};
