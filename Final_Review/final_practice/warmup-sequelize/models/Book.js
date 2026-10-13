
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Book = sequelize.define('Book', {
  title:   { type: DataTypes.STRING, allowNull: false },
  publishedYear: { type: DataTypes.INTEGER, defaultValue: 3 },
  Pages: { type: DataTypes.INTEGER, defaultValue: 3 },
});

export default Book;