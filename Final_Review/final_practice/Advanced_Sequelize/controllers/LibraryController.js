import { LibraryMember, LibraryBook } from '../models/index.js';

// POST /loans?memberId=1&bookId=1
export async function borrowBook(req, res) {
  const { memberId, bookId } = req.query;   // query — read query params

  try {
    const member = await LibraryMember.findByPk(memberId);
    const book   = await LibraryBook.findByPk(bookId);

    await member.addBorrowedBooks(book, {                                // addBorrowedBooks
      through: { borrowedAt: new Date(), returnedAt: null },
    });

    res.status(201).json({ message: 'Book borrowed' });      // 201
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}