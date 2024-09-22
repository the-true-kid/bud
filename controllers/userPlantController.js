const db = require('../models');

// Fetch all plants for the authenticated user
exports.getUserPlants = async (req, res) => {
  try {
    console.log('Fetching plants for user:', req.user.id);
    const userPlants = await db.UserPlant.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.Plant,
          as: 'plant',
          attributes: ['name', 'scientific_name', 'care_info', 'image_url'],
        },
      ],
    });
    console.log('Fetched userPlants:', userPlants);
    res.json(userPlants);
  } catch (error) {
    console.error('Error fetching user plants:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add a new plant for the authenticated user
exports.addUserPlant = async (req, res) => {
  try {
    const { plant_id, nickname, last_watered, watering_interval, custom_care_info, size, location, clone_label } = req.body;
    console.log('Received plant_id:', plant_id);

    if (!plant_id) {
      return res.status(400).json({ error: 'plant_id is required' });
    }

    const plant = await db.Plant.findOne({ where: { id: plant_id } });
    if (!plant) {
      console.log('Plant not found for plant_id:', plant_id);
      return res.status(404).json({ error: 'Plant not found' });
    }

    const userPlant = await db.UserPlant.create({
      user_id: req.user.id,
      plant_id: plant.id,
      nickname,
      last_watered,
      watering_interval,
      custom_care_info,
      size,
      location,
      clone_label,
    });

    const fullUserPlant = await db.UserPlant.findOne({
      where: { id: userPlant.id },
      include: [
        {
          model: db.Plant,
          as: 'plant',
          attributes: ['name', 'scientific_name', 'care_info', 'image_url'],
        },
      ],
    });

    res.status(201).json(fullUserPlant);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Unique Constraint Error:', error.message);
      return res.status(400).json({ error: 'This plant is already in your garden.' });
    }
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      console.error('Foreign Key Constraint Error:', error.message);
      return res.status(400).json({ error: 'Invalid plant_id.' });
    }
    console.error('Error occurred:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to add plant due to internal server error.' });
  }
};

// Update a user-plant association
exports.updateUserPlant = async (req, res) => {
  try {
    const { nickname, last_watered, watering_interval, custom_care_info, size, location, clone_label } = req.body;
    const userPlant = await db.UserPlant.findOne({
      where: { id: req.params.userPlantId, user_id: req.user.id },
    });

    if (userPlant) {
      await userPlant.update({
        nickname,
        last_watered,
        watering_interval,
        custom_care_info,
        size,
        location,
        clone_label,
      });
      console.log('Updated userPlant:', userPlant);
      res.json(userPlant);
    } else {
      console.log('User-Plant association not found for userPlantId:', req.params.userPlantId);
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    console.error('Error updating userPlant:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a user-plant association
exports.deleteUserPlant = async (req, res) => {
  try {
    const userPlant = await db.UserPlant.findOne({
      where: { id: req.params.userPlantId, user_id: req.user.id },
    });

    if (userPlant) {
      await userPlant.destroy();
      console.log('Deleted userPlant:', userPlant);
      res.json({ message: 'User-Plant association deleted' });
    } else {
      console.log('User-Plant association not found for userPlantId:', req.params.userPlantId);
      res.status(404).json({ error: 'User-Plant association not found' });
    }
  } catch (error) {
    console.error('Error deleting userPlant:', error);
    res.status(500).json({ error: error.message });
  }
};
