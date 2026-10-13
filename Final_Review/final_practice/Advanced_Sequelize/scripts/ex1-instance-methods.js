import { sequelize, LibraryMember } from '../models/index.js';

await sequelize.sync({ force: true });

const member = await LibraryMember.create({                    // .create()
  firstName: 'Sokha',
  lastName: 'Chan',
  booksBorrowedCount: 7,
});

console.log(member.getFullName());          // getFullName()  ->  "Sokha Chan"
console.log(member.isEligibleToBorrow());  // isEligibleToBorrow()  ->  false

await sequelize.close();