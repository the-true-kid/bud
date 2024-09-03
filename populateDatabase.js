const { faker } = require('@faker-js/faker');
const { sequelize, Plant, User, UserPlant } = require('./models'); // Importing the models and sequelize instance

const populateDatabase = async () => {
  await sequelize.sync({ force: true }); // Drops and recreates all tables

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

  // Create some Plants
  const plants = [];
  for (let i = 0; i < 10; i++) {
    const plant = await Plant.create({
      name: faker.commerce.productName(), // Fake plant name
      scientific_name: faker.random.words(2), // Fake scientific name
      care_info: faker.lorem.paragraph(), // Fake care info
      image_url: faker.image.imageUrl(), // Fake image URL
    });
    plants.push(plant);
  }

  // Create some UserPlants, linking users and plants
  for (let i = 0; i < 20; i++) {
    const user = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    const plant = plants[faker.datatype.number({ min: 0, max: plants.length - 1 })];

    await UserPlant.create({
      user_id: user.id,
      plant_id: plant.id,
      nickname: faker.commerce.productAdjective(), // Fake nickname for the plant
      last_watered: faker.date.past(), // Fake last watered date
      watering_interval: faker.datatype.number({ min: 1, max: 14 }), // Random watering interval between 1-14 days
      custom_care_info: faker.lorem.sentence(), // Fake custom care info
    });
  }

  console.log('Database populated with random data');
  await sequelize.close();
};

populateDatabase().catch((err) => console.error(err));
