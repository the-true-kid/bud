const multer = require('multer');
const path = require('path');

// Set up Multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/customPlants')); // Where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname; // Generate a unique filename
    cb(null, uniqueName);
  }
});

// Initialize Multer
const upload = multer({ storage: storage });

module.exports = upload;
