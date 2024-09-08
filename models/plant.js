'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    static associate(models) {
      Plant.belongsToMany(models.User, { through: models.UserPlant, as: 'users', foreignKey: 'plant_id' });
    }
  }

  Plant.init({
    name: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    care_info: DataTypes.TEXT,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plant',
  });

  return Plant;
};


