import { DataTypes } from 'sequelize';
import sequelize from '../configs/database.js';

const ClassRoom = sequelize.define('ClassRoom', {
  courseName: { type: DataTypes.STRING, allowNull: false },
  day: { type: DataTypes.STRING, allowNull: false }
});

export default ClassRoom;
