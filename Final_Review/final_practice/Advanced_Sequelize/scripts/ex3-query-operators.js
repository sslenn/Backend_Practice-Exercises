import { Op } from 'sequelize';
import { sequelize, LibraryBook } from '../models/index.js';

await sequelize.sync({ force: true });
await LibraryBook.bulkCreate([
    { title: 'Book A', author: 'Author A', publishedYear: 2010, pages: 300, price: 25, stock: 5, genre: 'fiction' },
    { title: 'Book B', author: 'Author B', publishedYear: 2015, pages: 450, price: 15, stock: 0, genre: 'non-fiction' },
    { title: 'Book C', author: 'Author C', publishedYear: 2020, pages: 200, price: 30, stock: 10, genre: 'sci-fi' },
    { title: 'Book D', author: 'Author D', publishedYear: 2005, pages: 500, price: 10, stock: 2, genre: 'biography' },
    { title: 'Book E', author: 'Author E', publishedYear: 2018, pages: 350, price: 20, stock: 0, genre: 'fiction' },
    { title: 'Book F', author: 'Author F', publishedYear: 2012, pages: 600, price: 40, stock: 3, genre: 'non-fiction' },
]);

// 1. Books that cost strictly more than $20
const expensive = await LibraryBook.findAll({
  where: { price: { [Op.gt]: 20 } },   // gt
});

// 2. Books that cost $20 or less
const affordable = await LibraryBook.findAll({
  where: { price: { [Op.lte]: 20 } },   // lte
});

// 3. Books with a price between $10 and $30 (inclusive)
const midRange = await LibraryBook.findAll({
  where: { price: { [Op.between]: [10, 30] } },   // 10, 30
});

// 4. Books that are out of stock
const outOfStock = await LibraryBook.findAll({
  where: { stock: { [Op.eq]: 0 } },   // 0
});

console.log('Expensive:', expensive.length);
console.log('Affordable:', affordable.length);
console.log('Mid-range:', midRange.length);
console.log('Out of stock:', outOfStock.length);

const results = await LibraryBook.findAll({
  where: {
     price: { [Op.between]: [10, 40] },
     genre: { [Op.in]: ['fiction', 'sci-fi'] },   // in
     stock: { [Op.gte]: 1 },                      // 1
  }
});

console.log('Matching books:', results.map(b => b.title));

await sequelize.close();