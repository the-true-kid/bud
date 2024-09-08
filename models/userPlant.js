'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPlant extends Model {
    static associate(models) {
      UserPlant.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      UserPlant.belongsTo(models.Plant, { foreignKey: 'plant_id', as: 'plant' });
    }
  }
  
  UserPlant.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      allowNull: false
    },
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Plant',
        key: 'id',
      },
      allowNull: false
    },
    nickname: DataTypes.STRING,
    last_watered: DataTypes.DATE,
    watering_interval: DataTypes.INTEGER,
    custom_care_info: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserPlant',
    tableName: 'userPlants',
    underscored: true,
  });
  
  return UserPlant;
};
