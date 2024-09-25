'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_plants', 'custom_watering_interval', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow nulls, as custom intervals are optional
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_plants', 'custom_watering_interval');
  },
};
