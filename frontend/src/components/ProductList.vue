<template>
  <div class="product-list-container">
    <h2 class="product-list-title">Product List</h2>
    <table class="product-list-table">
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
          <td>${{ product.price.toFixed(2) }}</td>
          <td>
            <button @click="editProduct(product)" class="button edit-button"><i class="fa fa-pencil"></i></button>
            <button @click="addToCart(product)" class="button add-to-cart-button"><i class="fa fa-cart-plus"></i></button>
            <button @click="deleteProduct(product)" class="button delete-button"><i class="fa fa-trash"></i></button>
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

const addToCart = (product) => {
  emits("add-cart", product);
}

const editProduct = (product) => {
  emits("edit-product", product);
}

const deleteProduct = (product) => {
  emits("delete-product", product);
}

</script>

<style scoped>
.product-list-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 900px;
  margin: 0 auto;
}

.product-list-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-list-table {
  width: 100%;
  border-collapse: collapse;
}

.product-list-table th,
.product-list-table td {
  padding: 12px;
  text-align: left;
}

.product-list-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  border-radius: 4px;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.add-to-cart-button {
  background-color: #ff9800;
  color: white;
}

.delete-button {
  background-color: #943002;
  color: white;
}
</style>