const fs = require('fs');
const { Plant } = require('../models'); // Import the Plant model from the models folder

async function importJSON() {
  const rawData = fs.readFileSync('./data/plants.json', 'utf-8'); // Read the JSON file
  const plants = JSON.parse(rawData); // Parse the data from JSON to JS objects

  plants.forEach(async (plant) => {
    try {
      // Insert data into the Plant table
      await Plant.create({
        name: plant.name,
        scientific_name: plant.scientific_name,
        care_info: plant.care_info,
        image_url: plant.image_url || null // Use null if no image URL is provided
      });
      console.log(`Inserted: ${plant.name}`);
    } catch (error) {
      console.error(`Error inserting ${plant.name}:`, error);
    }
  });
}

importJSON(); // Call the function to insert data
