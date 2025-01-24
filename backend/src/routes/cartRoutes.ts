import express from 'express';
import { addItemToCart, updateCartItem, removeItemFromCart, viewCart } from '../controllers/cartController';

const router = express.Router();

router.post('/', addItemToCart);
router.put('/', updateCartItem);
router.delete('/:productId', removeItemFromCart);
router.get('/', viewCart);

export default router;