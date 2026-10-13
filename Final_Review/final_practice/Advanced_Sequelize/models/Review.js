import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.FLOAT, validate: { min: 0, max: 5 } },
});

export default Review;