import { create } from "zustand";
import type { CartItem } from "./cart-store";

export type SubmittedOrder = {
  orderId: string;
  buyer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dni: string;
  };
  delivery: {
    method: "delivery" | "pickup";
    address?: string;
    reference?: string;
    district?: string;
    shippingCost: number;
  };
  payment: {
    method: "cash" | "yape" | "plin" | "transfer";
    proofFileName?: string;
  };
  items: CartItem[];
  subtotal: number;
  total: number;
  createdAt: string;
};

type CheckoutStore = {
  order: SubmittedOrder | null;
  submitOrder: (order: SubmittedOrder) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  order: null,
  submitOrder: (order) => set({ order }),
  reset: () => set({ order: null }),
}));
