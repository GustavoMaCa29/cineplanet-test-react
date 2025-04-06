import { create } from "zustand";

interface CartState {
  cart: { id: number; name: string; price: number; quantity: number }[];
  total: number;
  addToCart: (product: { id: number; name: string; price: number }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  calculateTotal: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  total: 0,
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === product.id);
      if (existing) {
        const updatedCart = state.cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
        return { cart: updatedCart };
      }
      const updatedCart = [...state.cart, { ...product, quantity: 1 }];
      return { cart: updatedCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      return { cart: updatedCart };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return { cart: updatedCart };
    }),
  calculateTotal: () =>
    set((state) => {
      const total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { total };
    }),
}));