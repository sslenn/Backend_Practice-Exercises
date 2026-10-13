import express from 'express';
const router = express.Router();

// GET /users/:id -> return the user id from the URL
router.get('/:_id', (req, res) => {
  const id = req.params._id;
  res.send(`Requested user with ID: ${id}`);
});

export default router;