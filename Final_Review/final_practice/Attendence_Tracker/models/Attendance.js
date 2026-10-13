import { DataTypes } from 'sequelize';
import sequelize from '../configs/database.js';

const Attendance = sequelize.define('Attendance', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { 
    type: DataTypes.ENUM('present', 'absent', 'late'), 
    defaultValue: 'present',
    allowNull: false
  },
  notes: { type: DataTypes.TEXT }
});

export default Attendance;
