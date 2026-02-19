const dotenv = require('dotenv');

dotenv.config();

const toNumber = (value, fallback) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const toBoolean = (value, fallback) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  return String(value).toLowerCase() === 'true';
};

const dbConfig = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tawhid_space_dev',
  host: process.env.DB_HOST || 'localhost',
  port: toNumber(process.env.DB_PORT, 5432),
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: toBoolean(process.env.DB_LOGGING, false)
};

module.exports = {
  development: dbConfig,
  test: {
    ...dbConfig,
    database: `${dbConfig.database}_test`,
    logging: false
  },
  production: {
    ...dbConfig,
    logging: false
  }
};
