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
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Ensures it's the primary key
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',  // Refers to the User model
        key: 'id',
      },
      allowNull: false,
    },
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Plant',  // Refers to the Plant model
        key: 'id',
      },
      allowNull: false,
    },
    nickname: DataTypes.STRING,
    last_watered: DataTypes.DATE,
    watering_interval: DataTypes.INTEGER,
    custom_care_info: DataTypes.TEXT,

    // New fields
    custom_watering_interval: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null, fallback to default if null
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clone_label: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'UserPlant',
    tableName: 'user_plants',
    underscored: true,
  });

  return UserPlant;
};
