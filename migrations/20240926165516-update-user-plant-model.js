'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Only add custom_image_url if it doesn't exist
    await queryInterface.addColumn('user_plants', 'custom_image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: remove custom_image_url
    await queryInterface.removeColumn('user_plants', 'custom_image_url');
  }
};
