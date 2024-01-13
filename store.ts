import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  onCheckout: string;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
};

// type CartItem = {
//   name: string;
//   id: string;
//   images?: string[];
//   description?: string;
//   unit_amount: number;
//   quantity: number;
// };

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: (cartItem.quantity as number) + 1,
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          // check if the item exists and decreases the quantity to 1
          if (existingItem && (existingItem.quantity as number) > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: (cartItem.quantity as number) - 1,
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            // remove item from our cart
            // filter out the items in cart that have
            // the id differ from the item we are going to remove
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
      setCheckout: (val) => set((state) => ({ onCheckout: val })),
      clearCart: () => set((state) => ({ cart: [] })),
    }),
    {
      name: "cart-store",
    }
  )
);

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    {
      name: "theme-store",
    }
  )
);
