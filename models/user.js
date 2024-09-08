'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Plant, { through: models.UserPlant, as: 'plants', foreignKey: 'user_id' });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
