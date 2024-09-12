'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Plant, {
        through: models.UserPlant,
        as: 'plants',
        foreignKey: 'user_id',
      });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',        // PascalCase model name
      tableName: 'users',       // Explicitly set table name to 'users' (lowercase, plural)
      underscored: true,        // Ensure field names are in snake_case (e.g., user_id)
    }
  );

  return User;
};
