// models/Student.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Student = sequelize.define('Student', {
  name:  { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
});

export default Student;