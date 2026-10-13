import express from 'express';
const router = express.Router();
import ProductController from '../controllers/product.js';

router.get('/all', ProductController.getAllProducts);
router.post('/create', ProductController.createProduct);

export default router;