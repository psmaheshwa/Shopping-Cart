<template>
  <div>
    <h2>{{ form.editing ? 'Edit Product' : 'Add Product' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.sku" placeholder="SKU" required />
      <input v-model="form.name" placeholder="Name" required />
      <input v-model.number="form.price" type="number" placeholder="Price" required />
      <button type="submit">{{ form.editing ? 'Update' : 'Add' }}</button>
      <button type="button" v-if="form.editing" @click="cancelEdit">Cancel</button>
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
