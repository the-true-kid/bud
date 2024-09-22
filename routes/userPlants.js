const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');  // Import the middleware
const userPlantController = require('../controllers/userPlantController');  // Import the controller

// Get all plants for the authenticated user
router.get('/', authenticateToken, userPlantController.getUserPlants);

// Associate a plant with the authenticated user
router.post('/', authenticateToken, userPlantController.addUserPlant);

// Update a user-plant association for the authenticated user
router.put('/:userPlantId', authenticateToken, userPlantController.updateUserPlant);

// Delete a user-plant association for the authenticated user
router.delete('/:userPlantId', authenticateToken, userPlantController.deleteUserPlant);

module.exports = router;
