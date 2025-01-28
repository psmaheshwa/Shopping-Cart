import { Product } from '../types/product';
import { Cart } from '../types/cart';

const apiUrl = 'http://localhost:3000';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${apiUrl}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchCart = async (): Promise<Cart> => {
  const res = await fetch(`${apiUrl}/cart`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
};

export const saveProduct = async (product: Product): Promise<Product> => {
  const res = await fetch(`${apiUrl}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to save product');
  return res.json();
};
