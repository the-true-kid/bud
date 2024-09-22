const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userPlantsController = require('../controllers/userPlantsController');

// Fetch all plants for the authenticated user
router.get('/', authenticateToken, userPlantsController.getUserPlants);

// Add a new plant for the authenticated user
router.post('/', authenticateToken, userPlantsController.addUserPlant);

// Update a user-plant association
router.put('/:userPlantId', authenticateToken, userPlantsController.updateUserPlant);

// Delete a user-plant association
router.delete('/:userPlantId', authenticateToken, userPlantsController.deleteUserPlant);

module.exports = router;
