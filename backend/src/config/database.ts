import { Sequelize } from 'sequelize';
const database_url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
export const sequelize = new Sequelize(database_url);
