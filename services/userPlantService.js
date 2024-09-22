const db = require('../models');

// Fetch all plants for the authenticated user
exports.getUserPlants = async (userId) => {
  return await db.UserPlant.findAll({
    where: { user_id: userId },
    include: [
      {
        model: db.Plant,
        as: 'plant',
        attributes: ['name', 'scientific_name', 'care_info', 'image_url'],
      },
    ],
  });
};

// Add a new plant for the authenticated user
exports.addUserPlant = async (userId, plantData) => {
  const { plant_id, nickname, last_watered, watering_interval, custom_care_info, size, location, clone_label } = plantData;

  const plant = await db.Plant.findOne({ where: { id: plant_id } });
  if (!plant) {
    throw new Error('Plant not found');
  }

  const userPlant = await db.UserPlant.create({
    user_id: userId,
    plant_id: plant.id,
    nickname,
    last_watered,
    watering_interval,
    custom_care_info,
    size,
    location,
    clone_label,
  });

  return await db.UserPlant.findOne({
    where: { id: userPlant.id },
    include: [
      {
        model: db.Plant,
        as: 'plant',
        attributes: ['name', 'scientific_name', 'care_info', 'image_url'],
      },
    ],
  });
};

// Update a user-plant association
exports.updateUserPlant = async (userId, userPlantId, plantData) => {
  const { nickname, last_watered, watering_interval, custom_care_info, size, location, clone_label } = plantData;

  const userPlant = await db.UserPlant.findOne({
    where: { id: userPlantId, user_id: userId },
  });

  if (!userPlant) {
    throw new Error('User-Plant association not found');
  }

  await userPlant.update({
    nickname,
    last_watered,
    watering_interval,
    custom_care_info,
    size,
    location,
    clone_label,
  });

  return userPlant;
};

// Delete a user-plant association
exports.deleteUserPlant = async (userId, userPlantId) => {
  const userPlant = await db.UserPlant.findOne({
    where: { id: userPlantId, user_id: userId },
  });

  if (!userPlant) {
    throw new Error('User-Plant association not found');
  }

  await userPlant.destroy();
};
