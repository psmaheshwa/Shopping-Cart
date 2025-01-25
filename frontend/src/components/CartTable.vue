<template>
  <div class="cart-container">
    <h2 class="cart-title">Cart</h2>
    <table class="cart-table">
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
        <tr v-for="item in cart" :key="item.productId" class="cart-item">
          <td>{{ item.productDetails.name }}</td>
          <td>{{ item.productDetails.sku }}</td>
          <td>${{ item.productDetails.price.toFixed(2) }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ (item.quantity * item.productDetails.price).toFixed(2) }}</td>
          <td>
            <button @click="updateQuantity(item.productId, item.quantity + 1)" class="button update-button">+</button>
            <button @click="updateQuantity(item.productId, item.quantity - 1)" :disabled="item.quantity <= 1" class="button decrement-button">-</button>
            <button @click="removeItem(item.productId)" class="button"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts" setup>

const props = defineProps({
  cart: Array,
});
const emits = defineEmits(['update-cart', 'remove-cart']);


const updateQuantity = async (productId, quantity) => {
    emits('update-cart', {productId, quantity});
};

const removeItem = async (productId) => {
  emits("remove-cart", productId);
}

</script>
<style scoped>
.cart-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
}

.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-table th,
.cart-table td {
  padding: 12px;
  text-align: left;
}

.cart-item {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.cart-item:hover {
  background-color: #f1f1f1;
}

.button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  border-radius: 4px;
}

.update-button {
  background-color: #4caf50;
  color: white;
}

.decrement-button {
  background-color: #f44336;
  color: white;
}

.remove-button {
  background-color: #ff9800;
  color: white;
}

button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>