
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
  Birthdate: { type: DataTypes.DATE },
});

export default Author;
