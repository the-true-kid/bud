'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserPlants', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Ensure this matches the actual name of your Users table (lowercase)
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      plant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plants',  // Assuming there is a Plants table (ensure it's lowercase if necessary)
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_watered: {
        type: Sequelize.DATE,
        allowNull: true
      },
      custom_watering_interval: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      custom_care_info: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      custom_image_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clone_label: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPlants');
  }
};
