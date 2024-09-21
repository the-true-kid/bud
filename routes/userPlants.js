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
    const {
      plant_id,
      nickname,
      last_watered,
      watering_interval,
      custom_care_info,
      size,
      location,
      clone_label
    } = req.body;

    // Log the received plant_id and user_id for debugging
    console.log('Received plant_id:', plant_id);
    console.log('Authenticated user ID:', req.user.id);

    if (!plant_id) {
      return res.status(400).json({ error: 'plant_id is required' });
    }

    // Check if the plant exists in the database
    const plant = await db.Plant.findOne({ where: { id: plant_id } });
    if (!plant) {
      console.log('Plant not found for plant_id:', plant_id);  // Debugging log
      return res.status(404).json({ error: 'Plant not found' });
    }

    // Create a new userPlant association, including all relevant fields
    const userPlant = await db.UserPlant.create({
      user_id: req.user.id,
      plant_id: plant.id,
      nickname,           // Optional field from the request body
      last_watered,       // Optional field from the request body
      watering_interval,  // Optional field from the request body
      custom_care_info,   // Optional field from the request body
      size,               // New field
      location,           // New field
      clone_label         // New field
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
    // Check for Sequelize-specific errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Unique Constraint Error:', error.message);  // Log specific error
      return res.status(400).json({ error: 'This plant is already in your garden.' });
    }
    
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      console.error('Foreign Key Constraint Error:', error.message);  // Log specific error
      return res.status(400).json({ error: 'Invalid plant_id.' });
    }

    // Log the full error message and stack trace for further debugging
    console.error('Error occurred:', error.message, error.stack);

    // Return a 500 Internal Server Error with the detailed message
    res.status(500).json({ error: 'Failed to add plant due to internal server error.' });
  }
});

/// Update a user-plant association for the authenticated user by userPlantId
router.put('/:userPlantId', authenticateToken, async (req, res) => {
  try {
    console.log('Updating plant for user:', req.user.id, 'with userPlant.id:', req.params.userPlantId);  // Debugging log

    const {
      nickname,
      last_watered,
      watering_interval,
      custom_care_info,
      size,
      location,
      clone_label
    } = req.body;

    // Find the specific user-plant association by userPlant.id
    const userPlant = await db.UserPlant.findOne({
      where: { id: req.params.userPlantId, user_id: req.user.id },  // Verify ownership by user_id and userPlant.id
    });

    if (userPlant) {
      // Update the userPlant with the new values from req.body
      await userPlant.update({
        nickname,           // Optional field to update
        last_watered,       // Optional field to update
        watering_interval,  // Optional field to update
        custom_care_info,   // Optional field to update
        size,               // New field to update
        location,           // New field to update
        clone_label         // New field to update
      });
      
      console.log('Updated userPlant:', userPlant);  // Debugging log
      res.json(userPlant);
    } else {
      console.log('User-Plant association not found for userPlantId:', req.params.userPlantId);  // Debugging log
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    console.error('Error updating userPlant:', error);  // Error log
    res.status(400).json({ error: error.message });
  }
});

// Delete a user-plant association for the authenticated user by userPlantId
router.delete('/:userPlantId', authenticateToken, async (req, res) => {
  try {
    console.log('Deleting plant for user:', req.user.id, 'with userPlant.id:', req.params.userPlantId);  // Debugging log

    const userPlant = await db.UserPlant.findOne({
      where: { id: req.params.userPlantId, user_id: req.user.id },  // Ensure the plant belongs to the user
    });

    if (userPlant) {
      await userPlant.destroy();
      console.log('Deleted userPlant:', userPlant);  // Debugging log
      res.json({ message: 'User-Plant association deleted' });
    } else {
      console.log('User-Plant association not found for userPlantId:', req.params.userPlantId);  // Debugging log
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    console.error('Error deleting userPlant:', error);  // Error log
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

