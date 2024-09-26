// middleware/imageService.js
const path = require('path');

// Placeholder function for image upload (to be replaced with actual cloud upload later)
const uploadImage = async (imageFile) => {
  // Simulate an image upload by returning the URL to the image in the public/images/plants folder
  console.log('Simulating image upload for', imageFile);
  
  // Return the mock URL for apple.jpeg located in the public/images/plants folder
  return '/images/plants/apple.jpeg'; // This will return the relative URL
};

module.exports = { uploadImage };
