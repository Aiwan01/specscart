import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  brand: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
   color: {
    type:DataTypes.ARRAY(DataTypes.STRING)
  },
  attributes: {
    type: DataTypes.JSONB
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  }
}, {
  tableName: 'products',
  timestamps: true
});

export default Product;

 