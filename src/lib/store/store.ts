import { create } from "zustand";
import { Product } from "../types";

type StoreState = {
  cart: Product[];
  purchasedItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  completePurchase: () => void;
};

const useStore = create<StoreState>((set) => ({
  cart: [],
  purchasedItems: [],
  addToCart: (product) =>
    set((state) => {
      const cartItem = state.cart.find((item) => item.id === product.id);
      if (cartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      ...state,
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set((state) => ({ ...state, cart: [] })),
  completePurchase: () =>
    set((state) => {
      const newPurchasedItems = [...state.purchasedItems, ...state.cart];
      return { ...state, cart: [], purchasedItems: newPurchasedItems };
    }),
}));

export default useStore;
