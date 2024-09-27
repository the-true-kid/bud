const getUserPlants = require('./getUserPlants');
const addUserPlant = require('./addUserPlant'); // Singular to match its purpose
const updateUserPlant = require('./updateUserPlant'); // Singular to match its purpose
const deleteUserPlant = require('./deleteUserPlant'); // Singular to match its purpose

module.exports = {
  getUserPlants,
  addUserPlant,
  updateUserPlant,
  deleteUserPlant,
};
