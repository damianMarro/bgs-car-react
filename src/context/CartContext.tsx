// src/context/CartContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { Vehicle, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (vehicle: Vehicle, dias: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

// Creamos el contexto vacio
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Componente proveedor que envuelve la aplicacion
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Inicializacion perezosa desde localStorage
    const saved = localStorage.getItem('bgs_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sincronizacion con localStorage
  useEffect(() => {
    localStorage.setItem('bgs_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (vehicle: Vehicle, dias: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === vehicle.id);
      if (existing) {
        // Si ya existe, sumamos los dias
        return prev.map((item) =>
          item.id === vehicle.id ? { ...item, dias: item.dias + dias } : item
        );
      }
      // Si no existe, lo agregamos
      return [...prev, { ...vehicle, dias }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Calculo derivado (no es un estado, se calcula en el render)
  const totalPrice = cart.reduce((acc, item) => acc + item.precioDia * item.dias, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}