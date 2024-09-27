const db = require('../../models'); // Adjust the path as needed
const { getCustomOrDefault } = require('./userPlantUtils'); // Import your utility function

// Fetch all plants for the authenticated user with calculated watering interval, care info, and custom image URL
const getUserPlants = async (userId) => {
  try {
    const userPlants = await db.UserPlant.findAll({
      where: { user_id: userId },
      include: [
        {
          model: db.Plant,
          as: 'plant',
          attributes: ['name', 'scientific_name', 'care_info', 'image_url', 'watering_interval'], // Include default plant attributes
        },
      ],
    });

    // Enrich each user plant with the correct watering interval, care info, and custom image URL
    return userPlants.map(userPlant => ({
      ...userPlant.toJSON(),
      watering_interval: getCustomOrDefault(userPlant, 'watering_interval'),
      care_info: getCustomOrDefault(userPlant, 'care_info'),
      image_url: getCustomOrDefault(userPlant, 'image_url'),
    }));
  } catch (error) {
    console.error('Error fetching user plants:', error);
    throw new Error('Unable to fetch user plants');
  }
};

module.exports = getUserPlants;
