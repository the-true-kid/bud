const userPlantService = require('../services/userPlants');

// Fetch all plants for the authenticated user
exports.getUserPlants = async (req, res, next) => {
  try {
    const userPlants = await userPlantService.getUserPlants(req.user.id);
    res.json(userPlants);
  } catch (error) {
    next(error);
  }
};

// Add a new plant for the authenticated user with custom image handling
exports.addUserPlant = async (req, res, next) => {
  try {
    const newUserPlant = await userPlantService.addUserPlant(req.user.id, req.body, req.file); // Pass req.file for the image
    res.status(201).json(newUserPlant);
  } catch (error) {
    next(error);
  }
};

// Update a user-plant association with custom image handling
exports.updateUserPlant = async (req, res, next) => {
  try {
    const updatedUserPlant = await userPlantService.updateUserPlant(req.user.id, req.params.userPlantId, req.body, req.file); // Pass req.file for the image
    res.json(updatedUserPlant);
  } catch (error) {
    next(error);
  }
};

// Delete a user-plant association
exports.deleteUserPlant = async (req, res, next) => {
  try {
    await userPlantService.deleteUserPlant(req.user.id, req.params.userPlantId);
    res.json({ message: 'User-Plant association deleted' });
  } catch (error) {
    next(error);
  }
};
