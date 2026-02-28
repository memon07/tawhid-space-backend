import { env } from './env';

const config = {
  development: {
    username: env.db.user,
    password: env.db.password,
    database: env.db.name,
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    logging: env.db.logging
  },
  test: {
    username: env.db.user,
    password: env.db.password,
    database: `${env.db.name}_test`,
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    logging: false
  },
  production: {
    username: env.db.user,
    password: env.db.password,
    database: env.db.name,
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    logging: false
  }
};

module.exports = config;
export default config;
