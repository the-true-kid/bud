const db = require('../models');
const { uploadImage } = require('../middleware/imageService'); // Correct path to uploadImage

// Utility function to dynamically get custom or default field, including image URL
const getCustomOrDefault = (userPlant, field) => {
  const customField = `custom_${field}`; // E.g., 'custom_watering_interval', 'custom_care_info', 'custom_image_url'
  const defaultField = userPlant.plant[field]; // E.g., 'watering_interval', 'care_info', 'image_url'

  // Return custom field if it exists, otherwise return the default field
  return userPlant[customField] || defaultField;
};

// Fetch all plants for the authenticated user with calculated watering interval, care info, and custom image URL
exports.getUserPlants = async (userId) => {
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
    watering_interval: getCustomOrDefault(userPlant, 'watering_interval'), // Dynamically get the watering interval
    care_info: getCustomOrDefault(userPlant, 'care_info'), // Dynamically get the care info
    image_url: getCustomOrDefault(userPlant, 'image_url') // Dynamically get the image URL (placeholder or default)
  }));
};

// Add a new plant for the authenticated user, with optional custom image
exports.addUserPlant = async (userId, plantData, customImage) => {
  const { plant_id, nickname, last_watered, custom_watering_interval, custom_care_info, size, location, clone_label } = plantData;

  const plant = await db.Plant.findOne({ where: { id: plant_id } });
  if (!plant) {
    throw new Error('Plant not found');
  }

  let custom_image_url = null;
  if (customImage) {
    custom_image_url = await uploadImage(customImage); // Use the uploaded image or fallback to a default one
  }

  const userPlant = await db.UserPlant.create({
    user_id: userId,
    plant_id: plant.id,
    nickname,
    last_watered,
    custom_watering_interval,
    custom_care_info,
    custom_image_url, // Store the custom image URL if provided
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
        attributes: ['name', 'scientific_name', 'care_info', 'image_url', 'watering_interval'],
      },
    ],
  });
};

// Update a user-plant association, with optional custom image upload
exports.updateUserPlant = async (userId, userPlantId, plantData, customImage) => {
  const { nickname, last_watered, custom_watering_interval, custom_care_info, size, location, clone_label } = plantData;

  const userPlant = await db.UserPlant.findOne({
    where: { id: userPlantId, user_id: userId },
  });

  if (!userPlant) {
    throw new Error('User-Plant association not found');
  }

  let custom_image_url = userPlant.custom_image_url; // Keep the current image if no new one is provided
  if (customImage) {
    custom_image_url = await uploadImage(customImage); // Simulate image upload and get placeholder URL
  }

  await userPlant.update({
    nickname,
    last_watered,
    custom_watering_interval,
    custom_care_info,
    custom_image_url, // Update custom image URL if a new image was uploaded
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
