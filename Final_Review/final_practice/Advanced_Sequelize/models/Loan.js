import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Loan = sequelize.define('Loan', {
  borrowedAt: DataTypes.DATEONLY,
  returnedAt: { type: DataTypes.DATEONLY, allowNull: true },   // true (nullable until returned)
});

export default Loan;
