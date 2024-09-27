const db = require('../../models');
const { uploadImage } = require('../../middleware/imageService');

const updateUserPlant = async (userId, userPlantId, plantData, customImage) => {
  const { nickname, last_watered, custom_watering_interval, custom_care_info, size, location, clone_label } = plantData;

  const userPlant = await db.UserPlant.findOne({
    where: { id: userPlantId, user_id: userId },
  });

  if (!userPlant) {
    throw new Error('User-Plant association not found');
  }

  let custom_image_url = userPlant.custom_image_url;
  if (customImage) {
    custom_image_url = await uploadImage(customImage);
  }

  // Update user-specific data in UserPlant
  await userPlant.update({
    nickname,
    last_watered,
    custom_watering_interval,
    custom_care_info,
    custom_image_url,
    size,
    location,
    clone_label,
  });

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
};

module.exports = updateUserPlant;
