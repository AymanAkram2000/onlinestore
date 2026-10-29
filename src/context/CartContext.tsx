'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'apparel_store_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (data) {
        setItems(JSON.parse(data));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, isInitialized]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const compositeId = `${newItem.product_id}-${newItem.color_id}-${newItem.size_id}`;
    
    setItems(prevItems => {
      const existing = prevItems.find(i => i.id === compositeId);
      if (existing) {
        return prevItems.map(i => 
          i.id === compositeId ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prevItems, { ...newItem, id: compositeId }];
    });

    setToastMessage(`تمت إضافة "${newItem.product_title}" (${newItem.color_name} - ${newItem.size_name}) إلى السلة بنجاح ✨`);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setItems([]);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalCount,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      toastMessage,
      clearToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
