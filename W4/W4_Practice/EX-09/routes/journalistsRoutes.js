import express from 'express';
import {
    getAllJournalists,
    getJournalistById,
    createJournalist,
    updateJournalist,
    deleteJournalist,
    getArticlesByJournalist
} from '../controllers/journalistsController.js';

const router = express.Router();

// Journalists routes
router.get('/', getAllJournalists);
router.get('/:id', getJournalistById);
router.post('/', createJournalist);
router.put('/:id', updateJournalist);
router.delete('/:id', deleteJournalist);

// Get articles by journalist
router.get('/:id/articles', getArticlesByJournalist);

export default router;
