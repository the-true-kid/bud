const db = require('../../models');
const { uploadImage } = require('../../middleware/imageService');

const addUserPlant = async (userId, plantData, customImage) => {
  const { plant_id, nickname, last_watered, custom_watering_interval, custom_care_info, size, location, clone_label } = plantData;

  const plant = await db.Plant.findOne({ where: { id: plant_id } });
  if (!plant) {
    throw new Error('Plant not found');
  }

  let custom_image_url = null;
  if (customImage) {
    custom_image_url = await uploadImage(customImage);
  }

  const userPlant = await db.UserPlant.create({
    user_id: userId,
    plant_id: plant.id,
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
    nickname: userPlant.nickname,
    last_watered: userPlant.last_watered,
    watering_interval: custom_watering_interval || plant.watering_interval,
    care_info: custom_care_info || plant.care_info,
    image_url: custom_image_url || plant.image_url,
    size: userPlant.size,
    location: userPlant.location,
    clone_label: userPlant.clone_label,
    createdAt: userPlant.createdAt,
    updatedAt: userPlant.updatedAt,
  };
};

module.exports = addUserPlant;
