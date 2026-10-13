import { DataTypes }  from 'sequelize';
import sequelize from '../configs/database.js';

const LibraryMember = sequelize.define('LibraryMember', {
   firstName: DataTypes.STRING,
   lastName: DataTypes.STRING,
   booksBorrowedCount: { type: DataTypes.INTEGER, defaultValue: 0 }
});

// add instance methods on the model's prototype 
LibraryMember.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`;
};

// add instance second methods methods 
LibraryMember.prototype.isEligibleToBorrow = function(){
    return this.booksBorrowedCount < 5;
};

export default LibraryMember;


