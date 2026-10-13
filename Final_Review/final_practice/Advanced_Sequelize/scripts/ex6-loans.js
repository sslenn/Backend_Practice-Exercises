import { sequelize, LibraryMember, LibraryBook, Loan } from '../models/index.js';

await sequelize.sync({ force: true });

const sokha = await LibraryMember.create({ firstName: 'Sokha', lastName: 'Chan' });
const dune  = await LibraryBook.create({ title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, pages: 412 });

await sokha.addBorrowedBooks(dune, {
  through: { borrowedAt: '2025-06-17', returnedAt: null },   // through
});

const borrowed = await sokha.getBorrowedBooks();
console.log(`${borrowed[0].title} borrowed on ${borrowed[0].Loan.borrowedAt}`);   // .Loan