const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');  // Import the JWT middleware
const db = require('../models');

// Get all plants for search functionality (without user restriction)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    // Find all plants in the database (not restricted by userId)
    const plants = await db.Plant.findAll();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all plants for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Find all plants that belong to the logged-in user (based on user ID from the token)
    const plants = await db.Plant.findAll({ where: { userId: req.user.id } });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific plant by ID (only if it belongs to the authenticated user)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // Find the plant by ID, but make sure it belongs to the logged-in user
    const plant = await db.Plant.findOne({ where: { id: req.params.id, userId: req.user.id } });
    
    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ error: 'Plant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
