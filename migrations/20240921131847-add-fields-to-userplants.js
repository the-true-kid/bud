'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_plants', 'size', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_plants', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('user_plants', 'clone_label', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_plants', 'size');
    await queryInterface.removeColumn('user_plants', 'location');
    await queryInterface.removeColumn('user_plants', 'clone_label');
  }
};
