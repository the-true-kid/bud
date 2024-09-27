const db = require('../../models');
const { uploadImage } = require('../../middleware/imageService');

const addUserPlant = async (userId, plantData, customImage) => {
  try {
    const { plant_id, nickname, last_watered, custom_watering_interval, custom_care_info, size, location, clone_label } = plantData;

    // Handle image upload if provided
    let custom_image_url = null;
    if (customImage) {
      custom_image_url = await uploadImage(customImage);
    }

    // Create user-specific plant entry in UserPlant
    const userPlant = await db.UserPlant.create({
      user_id: userId,
      plant_id, // Only store the plant_id to link with frontend state
      nickname,
      last_watered,
      custom_watering_interval,
      custom_care_info,
      custom_image_url,
      size,
      location,
      clone_label,
    });

    // Return user-specific data
    return {
      id: userPlant.id,
      plant_id: userPlant.plant_id,
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
    };
  } catch (error) {
    console.error('Error adding user plant:', error);
    throw error;
  }
};

module.exports = addUserPlant;
