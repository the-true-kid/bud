const userPlantService = require('../services/userPlantService');

// Fetch all plants for the authenticated user
exports.getUserPlants = async (req, res, next) => {
  try {
    const userPlants = await userPlantService.getUserPlants(req.user.id);
    res.json(userPlants);
  } catch (error) {
    next(error);  // Pass error to error middleware
  }
};

// Add a new plant for the authenticated user
exports.addUserPlant = async (req, res, next) => {
  try {
    const newUserPlant = await userPlantService.addUserPlant(req.user.id, req.body);
    res.status(201).json(newUserPlant);
  } catch (error) {
    next(error);  // Pass error to error middleware
  }
};

// Update a user-plant association
exports.updateUserPlant = async (req, res, next) => {
  try {
    const updatedUserPlant = await userPlantService.updateUserPlant(req.user.id, req.params.userPlantId, req.body);
    res.json(updatedUserPlant);
  } catch (error) {
    next(error);  // Pass error to error middleware
  }
};

// Delete a user-plant association
exports.deleteUserPlant = async (req, res, next) => {
  try {
    await userPlantService.deleteUserPlant(req.user.id, req.params.userPlantId);
    res.json({ message: 'User-Plant association deleted' });
  } catch (error) {
    next(error);  // Pass error to error middleware
  }
};
