// config/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  "specscart",     // database name
  "postgres",     // username
  "root", // password
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // disable SQL logging
  }
);

export default sequelize;
