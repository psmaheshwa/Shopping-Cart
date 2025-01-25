<template>
  <div>
    <h2>Product List</h2>
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.sku }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button @click="emits('add-cart', product)">Add to Cart</button>
            <button @click="$emit('edit-product', product)">Edit</button>
            <button @click="$emit('delete-product', product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  products: Array,
});
const emits = defineEmits(['edit-product', 'delete-product', 'add-cart']);
</script>
