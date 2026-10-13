import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Department = sequelize.define(
    'Department', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);  

export default Department;