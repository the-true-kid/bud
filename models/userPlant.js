'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPlant extends Model {
    static associate(models) {
      // Define associations with explicit foreign key names
      UserPlant.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE'  // Add cascade delete for user
      });
      UserPlant.belongsTo(models.Plant, {
        foreignKey: 'plant_id',
        as: 'plant',
        onDelete: 'CASCADE'  // Optional: Add cascade delete for plant if needed
      });
    }
  }

  UserPlant.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',  // Explicitly refer to the Users table
        key: 'id',
      },
    },
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Plants',  // Explicitly refer to the Plants table
        key: 'id',
      },
    },
    nickname: DataTypes.STRING,
    last_watered: DataTypes.DATE,
    watering_interval: DataTypes.INTEGER,
    custom_care_info: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'UserPlant',  // Explicitly define the model name
    tableName: 'userPlants',  // Explicitly define the table name to match your table
    timestamps: true,  // Add timestamps
    underscored: true,  // Use snake_case for automatically added fields (createdAt -> created_at)
  });

  return UserPlant;
};
