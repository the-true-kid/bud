// services/userPlants/userPlantUtils.js

// Utility function to dynamically get custom or default field, including image URL
const getCustomOrDefault = (userPlant, field) => {
    const customField = `custom_${field}`; // E.g., 'custom_watering_interval', 'custom_care_info', 'custom_image_url'
    const defaultField = userPlant.plant[field]; // E.g., 'watering_interval', 'care_info', 'image_url'
  
    // Return custom field if it exists, otherwise return the default field
    return userPlant[customField] || defaultField;
  };
  
  module.exports = {
    getCustomOrDefault,
  };
  