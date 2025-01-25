<template>
    <div>
      <ProductForm
        :edit-product="editProduct"
        @save-product="saveProduct"
      />
      <ProductList
        :products="products"
        @edit-product="editProductDetails"
        @delete-product="deleteProduct"
        @add-cart="addCart"
      />
      <CartTable
        :cart="cartList"
        @update-cart="updateCart"
        @remove-cart="removeItemFromCart"/>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import ProductForm from './ProductForm.vue';
  import ProductList from './ProductList.vue';
  import CartTable from './CartTable.vue';
  
  const products = ref([]);
  const editProduct = ref(null);
  const cartList = ref([]);
  
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3000/products');
    products.value = await res.json();
  };

  const fetchCart = async () => {
    const res = await fetch('http://localhost:3000/cart');
    cartList.value = await res.json();
  };

  const addCart = async (product) => {
    await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
    const res = await fetch('http://localhost:3000/cart');
    cartList.value = await res.json();
  };

  const updateCart = async (cart) => {
    await fetch('http://localhost:3000/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: cart.productId, quantity: cart.quantity }),
      });
    const res = await fetch('http://localhost:3000/cart');
    cartList.value = await res.json();
  };

  const removeItemFromCart = async (productId) => {
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    await fetchCart();
  }
  
  
  const saveProduct = async (product) => {
    try {
      await fetch('http://localhost:3000/products', {
        method: 'POST',
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
    editProduct.value = product; // Pass product to the form
  };
  
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
      await fetchProducts();
      await fetchCart();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  
  onMounted( async() => {
    await fetchCart();
    await fetchProducts();
  });
  </script>
  import type CartTableVue from './CartTable.vue';
