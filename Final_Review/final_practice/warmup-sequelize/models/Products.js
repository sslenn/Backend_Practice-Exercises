import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Product = sequelize.define(             // .define() maps a JS object to a table
  'Product',                                    // model name (Sequelize uses this as the table name)
  {
    name: {
      type: DataTypes.STRING,                  // STRING
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }
);

export default Product;