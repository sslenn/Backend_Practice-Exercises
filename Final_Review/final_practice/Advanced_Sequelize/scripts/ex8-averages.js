import { sequelize, LibraryMember, LibraryBook } from '../models/index.js';

await sequelize.sync({ force: true });

const [alice, bob, ronan] = await LibraryMember.bulkCreate([
  { firstName: 'Alice' }, { firstName: 'Bob' }, { firstName: 'Ronan' },
]);

const [dune, hobbit] = await LibraryBook.bulkCreate([
  { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, pages: 412 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937, pages: 310 },
]);

await alice.addReviewedBooks(dune,  { through: { rating: 4.5 } });
await bob.addReviewedBooks(dune,    { through: { rating: 3.0 } });
await ronan.addReviewedBooks(dune,  { through: { rating: 4.0 } });

// YOUR CODE HERE — also rate "hobbit" for each member with a score of your choice
// Average rating per book
const books = await LibraryBook.findAll({
  include: { model: LibraryMember, as: 'Reviewers' },   // 'Reviewers'
});

for (const book of books) {
  let sum = 0;
  for (const reviewer of book.Reviewers) {
    sum += reviewer.Review.rating;         // .Review
  }
  const average = sum / book.Reviewers.length;   // .length
  console.log(`${book.title} average rating: ${average}`);
}

// Average rating given by each member
const members = await LibraryMember.findAll({
  include: { model: LibraryBook, as: 'ReviewedBooks' },
});

for (const member of members) {
  let sum = 0;
  for (const book of member.ReviewedBooks) {   // .ReviewedBooks
    sum += book.Review.rating;
  }
  const average = sum / member.ReviewedBooks.length;
  console.log(`${member.firstName} average rating given: ${average}`);
}