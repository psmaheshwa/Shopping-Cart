import { CartItem } from '../models/cartModel';

export const validateCartItem = (cartItem: Partial<CartItem>): boolean => {
    if (!cartItem.productId || typeof cartItem.quantity !== 'number' || cartItem.quantity < 1) {
      return false;
    }
    return true;
  };