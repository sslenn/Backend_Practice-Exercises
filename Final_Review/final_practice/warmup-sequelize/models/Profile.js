import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Profile = sequelize.define('Profile', {
  bio:    { type: DataTypes.TEXT },
  avatar: { type: DataTypes.STRING },
});

export default Profile;