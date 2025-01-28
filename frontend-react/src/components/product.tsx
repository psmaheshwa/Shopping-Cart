import React, { useState, useEffect } from 'react';
import ProductForm from './productForm';
import ProductList from './productList';
// import CartTable from './CartTable';

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const Product: React.FC = () => {
//     console.log('Product component rendered');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [cartList, setCartList] = useState<CartItem[]>([]);

//   const apiUrl = 'http://localhost:3000';

//   const fetchProducts = async (): Promise<void> => {
//       const res = await fetch(`${apiUrl}/products`);
//       const data: Product[] = await res.json();
//       console.log("data!!!!!", data);
//       setProducts(data);
//   };

//   const fetchCart = async (): Promise<void> => {
//     try {
//       const res = await fetch(`${apiUrl}/cart`);
//       const data: CartItem[] = await res.json();
//       setCartList(data);
//     } catch (error) {
//       console.error('Failed to fetch cart:', error);
//     }
//   };

//   const addCart = async (product: Product): Promise<void> => {
//     try {
//       await fetch(`${apiUrl}/cart`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productId: product.id, quantity: 1 }),
//       });
//       fetchCart();
//     } catch (error) {
//       console.error('Failed to add to cart:', error);
//     }
//   };

//   const updateCart = async (cart: CartItem): Promise<void> => {
//     try {
//       await fetch(`${apiUrl}/cart`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(cart),
//       });
//       fetchCart();
//     } catch (error) {
//       console.error('Failed to update cart:', error);
//     }
//   };

//   const removeItemFromCart = async (productId: number): Promise<void> => {
//     try {
//       await fetch(`${apiUrl}/cart/${productId}`, { method: 'DELETE' });
//       fetchCart();
//     } catch (error) {
//       console.error('Failed to remove item from cart:', error);
//     }
//   };

//   const saveProduct = async (product: Product): Promise<void> => {
//     console.log(product);
//     try {
//       await fetch(`${apiUrl}/products`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(product),
//       });
//       fetchProducts();
//       setEditProduct(null);
//       fetchCart();
//     } catch (error) {
//       console.error('Failed to save product:', error);
//     }
//   };

//   const deleteProduct = async (product: Product): Promise<void> => {
//     try {
//       await fetch(`${apiUrl}/products/${product.id}`, { method: 'DELETE' });
//       fetchProducts();
//       fetchCart();
//     } catch (error) {
//       console.error('Failed to delete product:', error);
//     }
//   };

  useEffect(() => {
    console.log('useEffect called');
    // fetchProducts();
    // fetchCart();
  }, []);

  return (
    // <div className="app-container">
    //   <ProductForm editProduct={editProduct} saveProduct={saveProduct} />
    //   <div className="product-cart-container">
    //     <ProductList
    //       products={products}
    //       editProduct={setEditProduct}
    //       deleteProduct={deleteProduct}
    //       addCart={addCart}
    //     />
    //   </div>
    // </div>
    <div>
        hheeh
    </div>
  );
};

export default Product;