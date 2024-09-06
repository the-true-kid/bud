const env = process.env.NODE_ENV || 'development';  // Default to development if NODE_ENV isn't set
const machine = process.env.MACHINE_ENV || 'home';  // Default to home if MACHINE_ENV isn't set

// Load the appropriate .env file based on NODE_ENV and MACHINE_ENV
require('dotenv').config({ path: `.env.${env}.${machine}` });

module.exports = {
  development: {
    username: process.env.DB_USER || 'aaronweiss',
    password: process.env.DB_PASSWORD || 'qwerty',
    database: process.env.DB_NAME || 'bud_db_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'prod_user',
    password: process.env.DB_PASSWORD || 'secure_password',
    database: process.env.DB_NAME || 'bud_db_prod',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
};
