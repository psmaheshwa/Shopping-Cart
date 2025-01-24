import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import { validateProduct } from '../validators/productValidator';
import { readJSON, writeJSON } from '../utils/fileUtils';
import { v4 as uuidv4 } from 'uuid';

const PRODUCT_FILE = 'products.json';

export const addProduct = async (req: Request, res: Response) => {
  const { sku, name, price } = req.body;
  if (!validateProduct({ sku, name, price })) {
   res.status(400).send('Invalid product data');
   return;
  }

  const products: Product[] = await readJSON(PRODUCT_FILE);
  let product = products.find((p: Product) => p.sku === sku);
  if (product) {
    product.name = name;
    product.price = price;
  } else {
    product = { id: uuidv4(), sku, name, price };
    products.push(product);
  }
  await writeJSON(PRODUCT_FILE, products);

  res.status(201).json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  let products: Product[] = await readJSON(PRODUCT_FILE);
  products = products.filter((p) => p.id !== id);
  await writeJSON(PRODUCT_FILE, products);

  res.status(200).send('Product deleted');
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await readJSON(PRODUCT_FILE);
  res.status(200).json(products);
};