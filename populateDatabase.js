const { sequelize, User, Plant } = require('./models');
const { faker } = require('@faker-js/faker');

const populateDatabase = async () => {
  try {
    console.log('Attempting to authenticate database connection...');
    await sequelize.authenticate();  // Check connection
    console.log('Database connection successful!');

    // Sync the database (Drops and recreates all tables)
    console.log('Attempting to sync database...');
    await sequelize.sync({ force: true });
    console.log('Database sync successful!');

    // Create some Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        location: faker.address.city(),
      });
      users.push(user);
    }
    console.log('Users created successfully!');

    // Create some Plants
    const plants = [];
    for (let i = 0; i < 10; i++) {
      const plant = await Plant.create({
        name: faker.commerce.productName(),
        scientific_name: faker.lorem.words(2),
        care_info: faker.lorem.paragraph(),
        image_url: faker.image.imageUrl(),
      });
      plants.push(plant);
    }
    console.log('Plants created successfully!');

    // Associate Users with Plants via the through model (UserPlant)
    for (let i = 0; i < 20; i++) {
      const randomUser = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
      const randomPlant = plants[faker.datatype.number({ min: 0, max: plants.length - 1 })];

      // Add plant to the user
      await randomUser.addPlant(randomPlant, {
        through: {
          nickname: faker.commerce.productAdjective(),
          last_watered: faker.date.past(),
          watering_interval: faker.datatype.number({ min: 1, max: 14 }),
          custom_care_info: faker.lorem.sentence(),
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
