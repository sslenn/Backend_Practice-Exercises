import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database.js';

class LibraryBook extends Model {                 // Model
  getAgeInYears() {
    return new Date().getFullYear() - this.publishedYear;
  }

  // true if pages > 400
  isLongRead() {
    return this.pages > 400;                   // >
  }
}

LibraryBook.init(                                 // .init()
  {
    title:         { type: DataTypes.STRING, allowNull: false },
    author:        { type: DataTypes.STRING, allowNull: false },
    publishedYear: DataTypes.INTEGER,
    pages:         DataTypes.INTEGER,
    price:         { type: DataTypes.FLOAT, defaultValue: 0 },
    stock:         { type: DataTypes.INTEGER, defaultValue: 0 },
    genre:         DataTypes.ENUM('fiction', 'non-fiction', 'sci-fi', 'biography'),
  },
  { sequelize, modelName: 'LibraryBook' }                    // 'LibraryBook'
);

export default LibraryBook;