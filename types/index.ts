export interface Product {
  id: string;
  title: string;
  minisrc: string[];
  src: string[];
  description: string;
  content: string;
  price: number;
  colors: string[];
  discount: number;
  category: string;
  gender: 'male' | 'female' | 'unisex';
  itemRate: number;
  size?: string[];
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: number;
  addressName: string;
  deliveryAddress: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: Address;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface FilterState {
  category: string;
  gender: string;
  size: string;
  colors: string[];
  searchQuery: string;
}

export interface ProductFilters {
  category: string;
  gender: string;
  size: string;
  colors: string[];
}
