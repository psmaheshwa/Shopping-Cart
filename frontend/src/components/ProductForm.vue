<template>
  <div class="product-form-container">
    <h2>{{ form.editing ? 'Edit Product' : 'Add Product' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.sku" placeholder="SKU" required class="input-field" />
      <input v-model="form.name" placeholder="Name" required class="input-field" />
      <input v-model.number="form.price" type="number" placeholder="Price" required class="input-field" />
      <button type="submit" class="submit-button">{{ form.editing ? 'Update' : 'Add' }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  editProduct: Object, // Product to edit
});

const emits = defineEmits(['save-product']); // Emit an event to save or update the product

const form = reactive({
  id: '',
  sku: '',
  name: '',
  price: null as number | null,
  editing: false,
});

// Watch for changes in `editProduct` to populate the form
watch(
  () => props.editProduct,
  (newProduct) => {
    if (newProduct) {
      form.id = newProduct.id;
      form.sku = newProduct.sku;
      form.name = newProduct.name;
      form.price = newProduct.price;
      form.editing = true;
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emits('save-product', { ...form });
  resetForm();
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  form.id = '';
  form.sku = '';
  form.name = '';
  form.price = null;
  form.editing = false;
};
</script>
<style scoped>
.product-form-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
}

.product-form-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>