const { sequelize, User, Plant } = require('./models');
const plantData = require('./data/plants.json');  // Assuming the JSON file is named 'plants.json'

const populateDatabase = async () => {
  try {
    console.log('Attempting to authenticate database connection...');
    await sequelize.authenticate();  // Check connection
    console.log('Database connection successful!');

    // Sync the database (Drops and recreates all tables)
    console.log('Attempting to sync database...');
    await sequelize.sync({ force: true });
    console.log('Database sync successful!');

    // Create a Single User with provided details
    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword123",  // You can hash this later if needed
      location: "New York",
    });
    console.log(`User created successfully: ${user.username}`);

    // Create Plants from JSON data
    const plants = [];
    for (const plant of plantData) {
      const createdPlant = await Plant.create(plant);
      plants.push(createdPlant);
    }
    console.log('Plants created successfully from JSON!');

    // Associate User with some Plants via UserPlant
    for (let i = 0; i < 5; i++) {  // Associate user with 5 random plants for example
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];

      await user.addPlant(randomPlant, {
        through: {
          nickname: `Test ${randomPlant.name}`,  // Random nickname for the plant association
          last_watered: new Date(),  // Current date as last watered
          watering_interval: randomPlant.watering_interval,
          custom_watering_interval: randomPlant.watering_interval,  // Custom interval for the user (nullable)
          custom_care_info: `Custom care info for ${randomPlant.name}`,
        },
      });
    }
    console.log('UserPlants created successfully!');

  } catch (error) {
    console.error('Error during database sync or data population:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

// Run the population function
populateDatabase().catch((err) => console.error('Populate error:', err));



