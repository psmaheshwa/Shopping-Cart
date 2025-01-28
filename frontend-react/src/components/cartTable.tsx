import React from 'react';

interface ProductDetails {
  name: string;
  sku: string;
  price: number;
}

interface CartItem {
  productId: string;
  productDetails: ProductDetails;
  quantity: number;
}

interface CartTableProps {
  cart: CartItem[];
  updateCart: (productId: string, quantity: number ) => void;
  removeCart: (productId: string) => void;
}

const CartTable: React.FC<CartTableProps> = ({ cart, updateCart, removeCart }) => {
  const updateQuantity = (productId: string, quantity: number) => {
    updateCart(productId, quantity );
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.productId}>
              <td>{item.productDetails.name}</td>
              <td>{item.productDetails.sku}</td>
              <td>${item.productDetails.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.quantity * item.productDetails.price).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="button update-button"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="button decrement-button"
                >
                  -
                </button>
                <button onClick={() => removeCart(item.productId)} className="button">
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

export default CartTable;
