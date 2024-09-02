require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'aaronweiss',  // Using 'aaronweiss' as the default if DB_USER is not set
    password: process.env.DB_PASSWORD || 'qwerty',  // Using 'qwerty' as the default if DB_PASSWORD is not set
    database: process.env.DB_NAME || 'bud_db_dev',  // Defaulting to 'bud_db_dev' if DB_NAME is not set
    host: process.env.DB_HOST || 'localhost',  // Defaulting to 'localhost' if DB_HOST is not set
    port: process.env.DB_PORT || 5432,  // Defaulting to port 5432 if DB_PORT is not set
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'aaronweiss',
    password: process.env.DB_PASSWORD || 'qwerty',
    database: process.env.DB_NAME || 'bud_db_prod',  // Assuming you have a production database
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
};
