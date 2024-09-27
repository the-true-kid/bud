// services/userPlants/userPlantUtils.js

// Utility function to dynamically get custom or default field, including image URL
const getCustomOrDefault = (userPlant, field) => {
  // Ensure userPlant and its properties are valid
  if (!userPlant || !userPlant.plant) {
    return null; // or any fallback value you prefer
  }

  const customField = `custom_${field}`; // E.g., 'custom_watering_interval', 'custom_care_info', 'custom_image_url'
  const defaultField = userPlant.plant[field]; // E.g., 'watering_interval', 'care_info', 'image_url'

  // Return custom field if it exists, otherwise return the default field, or null if both are undefined
  return userPlant[customField] !== undefined ? userPlant[customField] : (defaultField !== undefined ? defaultField : null);
};

module.exports = {
  getCustomOrDefault,
};
