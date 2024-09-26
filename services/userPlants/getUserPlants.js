const db = require('../../models');
const { getCustomOrDefault } = require('./userPlantUtils');

const getUserPlants = async (userId) => {
  const userPlants = await db.UserPlant.findAll({
    where: { user_id: userId },
    include: [
      {
        model: db.Plant,
        as: 'plant',
        attributes: ['care_info', 'image_url', 'watering_interval'],
      },
    ],
  });

  return userPlants.map(userPlant => ({
    id: userPlant.id,
    nickname: userPlant.nickname,
    last_watered: userPlant.last_watered,
    watering_interval: getCustomOrDefault(userPlant, 'watering_interval'),
    care_info: getCustomOrDefault(userPlant, 'care_info'),
    image_url: getCustomOrDefault(userPlant, 'image_url'),
    size: userPlant.size,
    location: userPlant.location,
    clone_label: userPlant.clone_label,
    createdAt: userPlant.createdAt,
    updatedAt: userPlant.updatedAt,
  }));
};

module.exports = getUserPlants;
