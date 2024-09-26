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
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_watered: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    watering_interval: {
      type: DataTypes.INTEGER,
      allowNull: true, // Default watering interval (optional)
    },
    custom_watering_interval: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null, fallback to default if null
    },
    custom_care_info: {
      type: DataTypes.TEXT,
      allowNull: true, // User-specific care info
    },
    custom_image_url: {
      type: DataTypes.STRING,
      allowNull: true, // User-specific image URL
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true, // Plant size (user-defined)
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true, // Location (user-defined)
    },
    clone_label: {
      type: DataTypes.STRING,
      allowNull: true, // Optional user-defined clone label
    }
  }, {
    sequelize,
    modelName: 'UserPlant',
    tableName: 'user_plants',
    underscored: true,
  });

  return UserPlant;
};
