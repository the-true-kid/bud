const { UserPlant, Plant } = require('../models');

// Utility function to calculate watering interval
const getWateringInterval = (userPlant) => {
  return userPlant.custom_watering_interval || userPlant.Plant.watering_interval;
};

exports.getUserPlants = async (userId) => {
  // Fetch all UserPlants for the user, including the associated Plant data
  const userPlants = await UserPlant.findAll({
    where: { user_id: userId },
    include: { model: Plant }  // Include Plant to access the default watering_interval
  });

  // Enrich each userPlant with the correct watering interval
  return userPlants.map(userPlant => ({
    ...userPlant.toJSON(),
    watering_interval: getWateringInterval(userPlant)  // Use the custom or default interval
  }));
};

// Add a new plant for the user
exports.addUserPlant = async (userId, plantData) => {
  const newUserPlant = await UserPlant.create({
    user_id: userId,
    plant_id: plantData.plant_id,
    nickname: plantData.nickname || null,
    last_watered: plantData.last_watered || new Date(), // Default to today if not provided
    custom_watering_interval: plantData.custom_watering_interval || null,  // Allow user to provide custom interval
    size: plantData.size || null,
    location: plantData.location || null,
    clone_label: plantData.clone_label || null,
    custom_care_info: plantData.custom_care_info || null
  });
  return newUserPlant;
};

// Update a user-plant association
exports.updateUserPlant = async (userId, userPlantId, updateData) => {
  const userPlant = await UserPlant.findOne({
    where: { id: userPlantId, user_id: userId }
  });

  if (!userPlant) {
    throw new Error('UserPlant not found');
  }

  // Update fields if provided
  if (updateData.nickname) userPlant.nickname = updateData.nickname;
  if (updateData.last_watered) userPlant.last_watered = updateData.last_watered;
  if (updateData.custom_watering_interval !== undefined) {
    userPlant.custom_watering_interval = updateData.custom_watering_interval;
  }
  if (updateData.size) userPlant.size = updateData.size;
  if (updateData.location) userPlant.location = updateData.location;
  if (updateData.clone_label) userPlant.clone_label = updateData.clone_label;
  if (updateData.custom_care_info) userPlant.custom_care_info = updateData.custom_care_info;

  await userPlant.save();
  return userPlant;
};

// Delete a user-plant association
exports.deleteUserPlant = async (userId, userPlantId) => {
  const userPlant = await UserPlant.findOne({
    where: { id: userPlantId, user_id: userId }
  });

  if (!userPlant) {
    throw new Error('UserPlant not found');
  }

  await userPlant.destroy();
  return { message: 'User-Plant association deleted' };
};
