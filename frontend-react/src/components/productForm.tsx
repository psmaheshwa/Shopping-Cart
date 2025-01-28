import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';

interface ProductFormProps {
  editProduct: Product | null;
  saveProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ editProduct, saveProduct }) => {
  const [form, setForm] = useState<Product>({
    id: '',
    sku: '',
    name: '',
    price: 0
  });
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
      setCanEdit(true);
    } else {
      resetForm();
      setCanEdit(false);
    }
  }, [editProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    saveProduct(form);
    resetForm();
  };

  const resetForm = (): void => {
    setForm({ id: '', sku: '', name: '', price: 0,});
    setCanEdit(false);
  };

  return (
    <div className="product-form-container">
      <h2>{canEdit ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="sku"
          value={form.sku}
          onChange={handleChange}
          placeholder="SKU"
          required
          className="input-field"
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="input-field"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {canEdit ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
