const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all plants for a specific user
router.get('/users/:userId', async (req, res) => {
  try {
    const userPlants = await db.UserPlant.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: db.Plant,  // Reference to the Plant model
          as: 'plant'  // Alias used in the UserPlant model association
        }
      ]
    });
    res.json(userPlants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Associate a plant with a user
router.post('/users/:userId/plants', async (req, res) => {
  try {
    const userPlant = await db.UserPlant.create({
      user_id: req.params.userId,
      plant_id: req.body.plant_id,
      nickname: req.body.nickname,
      last_watered: req.body.last_watered,
      watering_interval: req.body.watering_interval,
      custom_care_info: req.body.custom_care_info,
    });
    res.status(201).json(userPlant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user-plant association
router.put('/users/:userId/plants/:plantId', async (req, res) => {
  try {
    const userPlant = await db.UserPlant.findOne({
      where: { user_id: req.params.userId, plant_id: req.params.plantId },
    });
    if (userPlant) {
      await userPlant.update(req.body);
      res.json(userPlant);
    } else {
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user-plant association
router.delete('/users/:userId/plants/:plantId', async (req, res) => {
  try {
    const userPlant = await db.UserPlant.findOne({
      where: { user_id: req.params.userId, plant_id: req.params.plantId },
    });
    if (userPlant) {
      await userPlant.destroy();
      res.json({ message: 'User-Plant association deleted' });
    } else {
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
