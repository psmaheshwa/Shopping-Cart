<template>
    <div class="app-container">
      <ProductForm
        :edit-product="editProduct"
        @save-product="saveProduct"
      />
      <div class="product-cart-container">
        <ProductList
          :products="products"
          @edit-product="editProductDetails"
          @delete-product="deleteProduct"
          @add-cart="addCart"
        />
        <CartTable
          :cart="cartList"
          @update-cart="updateCart"
          @remove-cart="removeItemFromCart"
        />
      </div>
    </div>
  </template>

  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import ProductForm from './ProductForm.vue';
  import ProductList from './ProductList.vue';
  import CartTable from './CartTable.vue';
  
  const products = ref([]);
  const editProduct = ref(null);
  const cartList = ref([]);
  
  const apiUrl = 'http://localhost:3000';
  
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/products`);
      products.value = await res.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  
  const fetchCart = async () => {
    try {
      const res = await fetch(`${apiUrl}/cart`);
      cartList.value = await res.json();
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };
  
  const addCart = async (product) => {
    try {
      await fetch(`${apiUrl}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };
  
  const updateCart = async (cart) => {
    try {
      await fetch(`${apiUrl}/cart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: cart.productId, quantity: cart.quantity }),
      });
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };
  
  const removeItemFromCart = async (productId) => {
    try {
      await fetch(`${apiUrl}/cart/${productId}`, { method: 'DELETE' });
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };
  
  const saveProduct = async (product) => {
    try {
      const method = 'POST';
      const url = `${apiUrl}/products`;
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      await fetchProducts();
      editProduct.value = null;
      await fetchCart();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };
  
  const editProductDetails = (product) => {
    editProduct.value = product;
  };
  
  const deleteProduct = async (product) => {
    try {
      await fetch(`${apiUrl}/products/${product.id}`, { method: 'DELETE' });
      await fetchProducts();
      await fetchCart();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  
  onMounted(async () => {
    await fetchProducts();
    await fetchCart();
  });
  </script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
}

.product-cart-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
}

.product-list-container {
  width: 48%; /* Taking up nearly half of the container */
}

.cart-table-container {
  width: 48%; /* Taking up the other half of the container */
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>