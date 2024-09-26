const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userPlantsController = require('../controllers/userPlantsController');
const upload = require('../middleware/multerConfig'); // Import Multer config for handling image uploads

// Fetch all plants for the authenticated user
router.get('/', authenticateToken, userPlantsController.getUserPlants);

// Add a new plant for the authenticated user with custom image upload
router.post('/', authenticateToken, upload.single('image'), userPlantsController.addUserPlant);

// Update a user-plant association with custom image upload
router.put('/:userPlantId', authenticateToken, upload.single('image'), userPlantsController.updateUserPlant);

// Delete a user-plant association
router.delete('/:userPlantId', authenticateToken, userPlantsController.deleteUserPlant);

module.exports = router;
