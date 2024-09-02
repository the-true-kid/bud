'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPlant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
        // Belongs to associations for User and Plant
        UserPlant.belongsTo(models.User, { foreignKey: 'user_id' });
        UserPlant.belongsTo(models.Plant, { foreignKey: 'plant_id' });
      }
      
    
  }
  UserPlant.init({
    user_id: DataTypes.INTEGER,
    plant_id: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    last_watered: DataTypes.DATE,
    watering_interval: DataTypes.INTEGER,
    custom_care_info: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserPlant',
  });
  return UserPlant;
};