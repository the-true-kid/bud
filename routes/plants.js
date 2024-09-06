const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await db.Plant.findAll();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await db.Plant.findByPk(req.params.id);
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
