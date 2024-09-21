'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Assuming the constraint is called unique_user_plant
    await queryInterface.removeConstraint('user_plants', 'unique_user_plant');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('user_plants', {
      fields: ['user_id', 'plant_id'],
      type: 'unique',
      name: 'unique_user_plant'
    });
  }
};
