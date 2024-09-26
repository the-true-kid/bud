const { sequelize, Plant } = require('./models');
const userService = require('./services/userService');  // Import the createUser function from your service
const plantData = require('./data/plants.json');  // Assuming the JSON file is named 'plants.json'

const populateDatabase = async () => {
  try {
    console.log('Attempting to authenticate database connection...');
    await sequelize.authenticate();  // Check connection
    console.log('Database connection successful!');

    console.log('Attempting to sync database...');
    await sequelize.sync({ force: true });
    console.log('Database sync successful!');

    // Use the createUser function to ensure password is hashed correctly
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword123",  // Plain-text password here
      location: "New York"
    };

    // Call the createUser function from userService
    const user = await userService.createUser(userData);
    console.log(`User created successfully: ${user.username}`);

    // Create Plants from JSON data
    const plants = [];
    for (const plant of plantData) {
      const createdPlant = await Plant.create(plant);
      plants.push(createdPlant);
    }
    console.log('Plants created successfully from JSON!');

    // Associate User with some Plants via UserPlant using default values
    for (let i = 0; i < 5; i++) {  // Associate user with 5 random plants
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];

      // Use default watering interval and care info (no custom fields)
      await user.addPlant(randomPlant, {
        through: {
          nickname: `Test ${randomPlant.name}`,  // Random nickname for the plant association
          last_watered: new Date(),  // Current date as last watered
          watering_interval: randomPlant.watering_interval,  // Use default watering interval
          custom_care_info: null,  // No custom care info
        },
      });
    }
    console.log('UserPlants created successfully with default watering and care info!');

  } catch (error) {
    console.error('Error during database sync or data population:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

// Run the population function
populateDatabase().catch((err) => console.error('Populate error:', err));
