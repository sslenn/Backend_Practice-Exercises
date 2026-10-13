import express from 'express';
import { borrowBook } from '../controllers/libraryController.js';
// import the other controller functions you wrote (returnLoan, getMemberLoans, rateBook, getAverageRating)

const router = express.Router();

router.post('/loans', borrowBook);   // post
// YOUR CODE HERE — register the remaining 4 routes from the table above
router.post('/loans/return', returnLoan);   // post
router.get('/loans', getMemberLoans);
router.post('/reviews', rateBook);   // post
router.get('/reviews/average', getAverageRating);


export default router;