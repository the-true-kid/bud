const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');  // Import the middleware
const db = require('../models');

// Get all plants for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching plants for user:', req.user.id);  // Debugging log

    const userPlants = await db.UserPlant.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.Plant,  // Reference to the Plant model
          as: 'plant',      // Alias used in the UserPlant model association
          attributes: ['name', 'scientific_name', 'care_info', 'image_url'],  // Include necessary fields from Plant
        },
      ],
    });

    console.log('Fetched userPlants:', userPlants);  // Debugging log
    res.json(userPlants);
  } catch (error) {
    console.error('Error fetching user plants:', error);  // Error log
    res.status(500).json({ error: error.message });
  }
});

// Associate a plant with the authenticated user based on plant_id
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { plant_id } = req.body;

    // Log the received plant_id and user_id
    console.log('Received plant_id:', plant_id);
    console.log('Authenticated user ID:', req.user.id);

    if (!plant_id) {
      return res.status(400).json({ error: 'plant_id is required' });
    }

    const plant = await db.Plant.findOne({ where: { id: plant_id } });
    if (!plant) {
      console.log('Plant not found for plant_id:', plant_id);  // Add this log
      return res.status(404).json({ error: 'Plant not found' });
    }

    const userPlant = await db.UserPlant.create({
      user_id: req.user.id,
      plant_id: plant.id,
    });

    // Fetch and return the full userPlant with the associated Plant details
    const fullUserPlant = await db.UserPlant.findOne({
      where: { id: userPlant.id },
      include: [
        {
          model: db.Plant,  // Include the Plant model
          as: 'plant',      // Alias used in the UserPlant model association
          attributes: ['name', 'scientific_name', 'care_info', 'image_url'],  // Include necessary fields from Plant
        },
      ],
    });

    res.status(201).json(fullUserPlant);
  } catch (error) {
    console.error('Error occurred:', error);  // Log the full error
    res.status(500).json({ error: 'Failed to add plant' });
  }
});

// Update a user-plant association for the authenticated user
router.put('/:plantId', authenticateToken, async (req, res) => {
  try {
    console.log('Updating plant for user:', req.user.id, 'with plant_id:', req.params.plantId);  // Debugging log

    const userPlant = await db.UserPlant.findOne({
      where: { user_id: req.user.id, plant_id: req.params.plantId },  // Verify ownership by user_id and plant_id
    });

    if (userPlant) {
      await userPlant.update(req.body);
      console.log('Updated userPlant:', userPlant);  // Debugging log
      res.json(userPlant);
    } else {
      console.log('User-Plant association not found for plantId:', req.params.plantId);  // Debugging log
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    console.error('Error updating userPlant:', error);  // Error log
    res.status(400).json({ error: error.message });
  }
});

// Delete a user-plant association for the authenticated user
router.delete('/:plantId', authenticateToken, async (req, res) => {
  try {
    console.log('Deleting plant for user:', req.user.id, 'with plant_id:', req.params.plantId);  // Debugging log

    const userPlant = await db.UserPlant.findOne({
      where: { user_id: req.user.id, plant_id: req.params.plantId },  // Ensure the plant belongs to the user
    });

    if (userPlant) {
      await userPlant.destroy();
      console.log('Deleted userPlant:', userPlant);  // Debugging log
      res.json({ message: 'User-Plant association deleted' });
    } else {
      console.log('User-Plant association not found for plantId:', req.params.plantId);  // Debugging log
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    console.error('Error deleting userPlant:', error);  // Error log
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
