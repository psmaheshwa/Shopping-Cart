export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Cart {
    items: CartItem[];
    totalPrice: number;
  }
  