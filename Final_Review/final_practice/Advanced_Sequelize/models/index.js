import sequelize from '../configs/database.js';
import LibraryMember from './LibraryMember.js';
import LibraryBook from './LibraryBook.js';
import Loan from './Loan.js';

// Sequelize will create a junction table automatically
LibraryMember.belongsToMany(LibraryBook, { through: Review, as: 'ReviewBooks' });   // belongsToMany, 'Favorites'
LibraryBook.belongsToMany(LibraryMember, { through: Review, as: 'Reviewers' });   // belongsToMany

export { sequelize, LibraryMember, LibraryBook, Loan };