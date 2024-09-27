'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPlant extends Model {
    static associate(models) {
      // Association with User and Plant models
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
      allowNull: true,  // User-defined nickname for the plant
    },
    last_watered: {
      type: DataTypes.DATE,
      allowNull: true,  // Date when the plant was last watered
    },
    custom_watering_interval: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Custom number of days between waterings
    },
    custom_care_info: {
      type: DataTypes.TEXT,
      allowNull: true,  // User-defined care information
    },
    custom_image_url: {
      type: DataTypes.STRING,
      allowNull: true,  // User-defined image URL
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,  // User-defined plant size
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,  // User-defined plant location
    },
    notification_preference: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // Whether the user wants to receive watering notifications
    }
  }, {
    sequelize,
    modelName: 'UserPlant',
    tableName: 'user_plants',
    underscored: true,  // Use snake_case for the database columns
  });

  return UserPlant;
};
