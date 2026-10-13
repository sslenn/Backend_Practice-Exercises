import express from 'express';
const router = express.Router();

// GET /books -> return list of books
router.get('/', (req, res) => {
  res.json([{ id: 1, title: 'Clean Code' }]);
});

// POST /books -> add a new book (read from request body)
router.post('/', (req, res) => {
  const newBook = req.body;
  res.status(201).json({ message: 'Book created', book: newBook });
});

export default router;