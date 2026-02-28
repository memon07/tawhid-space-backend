import { Dialect, Sequelize } from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: env.db.dialect as Dialect,
  logging: env.db.logging ? console.log : false
});

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
};
