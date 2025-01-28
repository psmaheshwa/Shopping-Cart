import React from 'react';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  editProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
  addCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, editProduct, deleteProduct, addCart }) => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product List</h2>
      <table className="product-list-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => editProduct(product)} className="button edit-button">
                  Edit
                </button>
                <button onClick={() => addCart(product)} className="button add-to-cart-button">
                  Add to Cart
                </button>
                <button onClick={() => deleteProduct(product)} className="button delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
