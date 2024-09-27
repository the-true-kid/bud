const db = require('../../models');

const getUserPlants = async (userId) => {
  try {
    // Fetch all user-specific plants for the authenticated user
    const userPlants = await db.UserPlant.findAll({
      where: { user_id: userId },
    });

    // Return user-specific data only (without including Plant details)
    return userPlants.map(userPlant => ({
      id: userPlant.id,
      plant_id: userPlant.plant_id, // Use this to link with Plant data in the frontend state
      nickname: userPlant.nickname,
      last_watered: userPlant.last_watered,
      custom_watering_interval: userPlant.custom_watering_interval,
      custom_care_info: userPlant.custom_care_info,
      custom_image_url: userPlant.custom_image_url,
      size: userPlant.size,
      location: userPlant.location,
      clone_label: userPlant.clone_label,
      createdAt: userPlant.createdAt,
      updatedAt: userPlant.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching user plants:', error);
    throw new Error('Unable to fetch user plants');
  }
};

module.exports = getUserPlants;
