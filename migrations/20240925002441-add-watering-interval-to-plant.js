'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('plants', 'watering_interval', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 7, // Default to 7 days
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('plants', 'watering_interval');
  },
};
