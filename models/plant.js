'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    static associate(models) {
      // Association between Plant and User through UserPlant
      Plant.belongsToMany(models.User, {
        through: models.UserPlant,
        as: 'users',
        foreignKey: 'plant_id',
        onDelete: 'CASCADE'
      });
    }
  }

  // Initialize the Plant model
  Plant.init(
    {
      name: DataTypes.STRING,
      scientific_name: DataTypes.STRING,
      care_info: DataTypes.TEXT,
      image_url: DataTypes.STRING,
      watering_interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 7, // Default watering interval of 7 days
      },
    },
    {
      sequelize,
      modelName: 'Plant',        // Model name remains PascalCase
      tableName: 'plants',       // Explicitly set the table name as 'plants' (plural)
      underscored: true,         // Ensure fields like 'plant_id' are in snake_case
    }
  );

  return Plant;
};
