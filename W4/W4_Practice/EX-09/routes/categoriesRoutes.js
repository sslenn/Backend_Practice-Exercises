import express from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getArticlesByCategory
} from '../controllers/categoriesController.js';

const router = express.Router();

// Categories routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

// Get articles by category
router.get('/:id/articles', getArticlesByCategory);

export default router;
