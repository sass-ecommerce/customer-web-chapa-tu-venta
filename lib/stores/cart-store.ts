import { create } from "zustand";

// Minimal shape the cart needs to render an item, satisfied by both
// MockProduct (catalog) and DisplayProduct (API-backed product pages).
export type CartProduct = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  category: string;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isSheetOpen: boolean;
  lastAdded: CartProduct | null;
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (id: string | number) => void;
  updateQty: (id: string | number, quantity: number) => void;
  clear: () => void;
  openSheet: () => void;
  closeSheet: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isSheetOpen: false,
  lastAdded: null,

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [...state.items, { product, quantity }];
      return { items, lastAdded: product };
    });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ lastAdded: null }), 3000);
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),

  updateQty: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.product.id !== id)
          : state.items.map((i) =>
              i.product.id === id ? { ...i, quantity } : i
            ),
    })),

  clear: () => set({ items: [] }),
  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
}));
