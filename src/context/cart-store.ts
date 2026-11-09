import { createContext } from 'react';
import type { CartItem, Vehicle } from '../types';

export interface CartContextValue {
  cart: CartItem[];
  addToCart: (vehicle: Vehicle, offerPrice?: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
  rentalDays: number;
  setRentalDays: (days: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
