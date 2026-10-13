import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Employee = sequelize.define(
    'Employee', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);  

export default Employee;