import React from 'react';
import Product from './product';

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
                <i className="fa fa-pencil"></i>
                </button>
                <button onClick={() => addCart(product)} className="button add-to-cart-button">
                <i className="fa fa-cart-plus"></i>
                </button>
                <button onClick={() => deleteProduct(product)} className="button delete-button">
                <i className="fa fa-trash"></i>
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
