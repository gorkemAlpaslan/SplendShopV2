'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('purchaseProducts');
    if (savedCart) {
      try {
        const productIds = JSON.parse(savedCart);
        const cartItems: CartItem[] = [];
        
        productIds.forEach((id: string) => {
          const productData = localStorage.getItem(id);
          if (productData) {
            const product: Product = JSON.parse(productData);
            const existingItem = cartItems.find(item => item.product.id === product.id);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              cartItems.push({ product, quantity: 1 });
            }
          }
        });
        
        setItems(cartItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    if (items.length > 0) {
      const productIds: string[] = [];
      items.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          productIds.push(item.product.id);
          localStorage.setItem(item.product.id, JSON.stringify(item.product));
        }
      });
      localStorage.setItem('purchaseProducts', JSON.stringify(productIds));
    } else {
      localStorage.removeItem('purchaseProducts');
    }
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = (): number => {
    return items.reduce((total, item) => {
      const price = item.product.price - item.product.price * item.product.discount;
      return total + price * item.quantity;
    }, 0);
  };

  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
