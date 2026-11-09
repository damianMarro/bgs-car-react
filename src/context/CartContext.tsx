import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './cart-store';
import type { CartItem, Vehicle } from '../types';

const CART_KEY = 'bgs_carrito';
const DAYS_KEY = 'bgs_dias_reserva';

function normalizeImagePath(image: string) {
  return image.startsWith('/') ? image : `/${image.replace(/^\.\//, '')}`;
}

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const items = JSON.parse(stored) as Array<CartItem & { cantidad?: number }>;
    return items.map((item) => ({
      ...item,
      dias: item.dias ?? item.cantidad ?? 1,
      imagen: normalizeImagePath(item.imagen),
      transmision: item.transmision === 'Manual' ? 'Manual' : 'Automático',
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [rentalDays, setRentalDaysState] = useState(() => {
    const days = Number(localStorage.getItem(DAYS_KEY));
    return Number.isInteger(days) && days > 0 ? days : 1;
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const setRentalDays = (days: number) => {
    const safeDays = Number.isInteger(days) && days > 0 ? days : 1;
    setRentalDaysState(safeDays);
    localStorage.setItem(DAYS_KEY, String(safeDays));
  };

  const addToCart = (vehicle: Vehicle) => {
    setCart((current) => {
      const found = current.some((item) => item.id === vehicle.id);
      if (found) {
        return current.map((item) => item.id === vehicle.id ? { ...item, dias: rentalDays } : item);
      }
      return [...current, { ...vehicle, dias: rentalDays }];
    });
  };

  const removeFromCart = (id: number) => setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const totalPrice = cart.reduce((sum, item) => sum + item.precioDia * item.dias, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, rentalDays, setRentalDays }}>
      {children}
    </CartContext.Provider>
  );
}
