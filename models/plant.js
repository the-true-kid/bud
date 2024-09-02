'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Many-to-many association with User through UserPlant
Plant.belongsToMany(models.User, { through: models.UserPlant });
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