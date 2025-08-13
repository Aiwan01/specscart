// models/index.js
import sequelize from '../config/db.js';
import Product from './Products.js';


const db = {
  sequelize,
  Product,
};

export default db;
