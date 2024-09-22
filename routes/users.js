const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController');
const { validateUserCreation, validateUserUpdate } = require('../middleware/validationMiddleware');

// Create a new user (Public route)
router.post('/', validateUserCreation, userController.createUser);

// Update a user by ID (Authenticated user only)
router.put('/:id', authenticateToken, validateUserUpdate, userController.updateUser);

// Get user details (Authenticated user only)
router.get('/:id', authenticateToken, userController.getUserById);

// Delete a user by ID (Authenticated user only)
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
