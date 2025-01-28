import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
}

interface ProductFormProps {
  editProduct: Product | null;
  saveProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ editProduct, saveProduct }) => {
  const [form, setForm] = useState<Product & { editing: boolean }>({
    id: '',
    sku: '',
    name: '',
    price: 0,
    editing: false,
  });

  useEffect(() => {
    if (editProduct) {
      setForm({ ...editProduct, editing: true });
    } else {
      resetForm();
    }
  }, [editProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // console.log(e.isDefaultPrevented())
    // e.preventDefault();
    console.log('Form submitted without reloading the page')
    saveProduct(form);
    resetForm();
  };

  const resetForm = (): void => {
    setForm({ id: '', sku: '', name: '', price: 0, editing: false });
  };

  return (
    <div className="product-form-container">
      <h2>{form.editing ? 'Edit Product' : 'Add Product'}</h2>
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
          {form.editing ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
