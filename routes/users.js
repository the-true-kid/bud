const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');  // Import the JWT middleware
const userController = require('../controllers/userController');  // Import the controller

// Get all users (Admin or specific roles)
router.get('/', authenticateToken, userController.getAllUsers);

// Get the authenticated user's details
router.get('/getUser', authenticateToken, userController.getUser);

// Get a specific user by ID (Authenticated user only)
router.get('/:id', authenticateToken, userController.getUserById);

// Create a new user (Public route)
router.post('/', userController.createUser);

// Update a user by ID (Authenticated user only)
router.put('/:id', authenticateToken, userController.updateUser);

// Delete a user by ID (Authenticated user only)
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
