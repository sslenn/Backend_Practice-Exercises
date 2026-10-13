import { DataTypes } from 'sequelize';
import sequelize from '../configs/database.js';

const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
});

export default Student;