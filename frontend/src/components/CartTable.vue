<template>
  <div>
    <h2>Cart</h2>
    <table>
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
        <tr v-for="item in cart" :key="item.productId">
          <td>{{ item.productDetails.name }}</td>
          <td>{{ item.productDetails.sku }}</td>
          <td>${{ item.productDetails.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ (item.quantity * item.productDetails.price) }}</td>
          <td>
            <button @click="updateQuantity(item.productId, item.quantity + 1)">+</button>
            <button @click="updateQuantity(item.productId, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
            <button @click="removeItem(item.productId)">Remove</button>
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
