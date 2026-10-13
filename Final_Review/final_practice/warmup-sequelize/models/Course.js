// models/Course.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Course = sequelize.define('Course', {
  title:   { type: DataTypes.STRING, allowNull: false },
  credits: { type: DataTypes.INTEGER, defaultValue: 3 },
});

export default Course;