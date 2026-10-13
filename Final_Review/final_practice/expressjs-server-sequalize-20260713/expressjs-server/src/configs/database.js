import { Sequelize } from 'sequelize';

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  database: 'SchoolMngt', // Database name
  username: 'root',
  password: '', // Add your MySQL password here
  dialect: 'mysql', // Change to 'sqlite' for SQLite
  host: 'localhost', // MySQL host
  logging: true, // Disable logging; default: console.log
});

export default sequelize;