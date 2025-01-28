interface ProductDetails {
    name: string;
    sku: string;
    price: number;
  }
  
  export interface CartItem {
    productId: string;
    productDetails: ProductDetails;
    quantity: number;
  }