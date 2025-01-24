import { Request, Response } from 'express';
import { CartItem } from '../models/cartModel';
import { Product } from '../models/productModel';
import { validateCartItem } from '../validators/cartValidator';
import { readJSON, writeJSON } from '../utils/fileUtils';

const PRODUCT_FILE = 'products.json';
const CART_FILE = 'cart.json';

export const addItemToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  if (!validateCartItem({ productId, quantity })) {
    res.status(400).send('Invalid cart item data');
    return;
  }

  const products = await readJSON(PRODUCT_FILE);
  const cart: CartItem[] = await readJSON(CART_FILE);

  const product = products.find((p: Product) => p.id === productId);
  if (!product){
    res.status(404).send('Product not found');
    return;
  } 

  const item = cart.find((c) => c.productId === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  await writeJSON(CART_FILE, cart);
  const detailedCart = await embedProductDetails(cart, products);
  res.status(201).json(detailedCart);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  const cart: CartItem[] = await readJSON(CART_FILE);
  const products = await readJSON(PRODUCT_FILE);

  const item = cart.find((c) => c.productId === productId);
  if (!item) {
    res.status(404).send('Item not found');
    return;
  }

  if (quantity < 1) {
    const updatedCart = cart.filter((c) => c.productId !== productId);
    await writeJSON(CART_FILE, updatedCart);
    const detailedCart = await embedProductDetails(updatedCart, products);
    res.status(200).json(detailedCart);
  } else {
    item.quantity = quantity;
    await writeJSON(CART_FILE, cart);
    const detailedCart = await embedProductDetails(cart, products);
    res.status(200).json(detailedCart);
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const cart: CartItem[] = await readJSON(CART_FILE);
  const products = await readJSON(PRODUCT_FILE);

  const updatedCart = cart.filter((c) => c.productId !== productId);
  await writeJSON(CART_FILE, updatedCart);
  const detailedCart = await embedProductDetails(updatedCart, products);
  res.status(200).json(detailedCart);
};

export const viewCart = async (req: Request, res: Response) => {
  const products = await readJSON(PRODUCT_FILE);
  const cart: CartItem[] = await readJSON(CART_FILE);

  const detailedCart = await embedProductDetails(cart, products);
  res.status(200).json(detailedCart);
};

const embedProductDetails = async (cart: CartItem[], products: Product[]) => {
  return cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product
      ? { ...item, productDetails: { name: product.name, price: product.price, sku: product.sku } }
      : null;
  }).filter(Boolean);
};