import { Product } from '../models/productModel';

export const validateProduct = (product: Partial<Product>): boolean => {
  if (!product.name || typeof product.price !== 'number' || product.price < 0 || !product.sku) {
    return false;
  }
  return true;
};
