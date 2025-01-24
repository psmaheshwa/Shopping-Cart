import express from 'express';
import { addProduct, deleteProduct, getProducts } from '../controllers/productController';

const router = express.Router();

router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.get('/', getProducts);

export default router;