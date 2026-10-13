import { create } from "zustand";
import type { CartItem } from "./cart-store";

export type DeliveryMethod = "delivery" | "pickup";
export type PaymentMethod = "cash" | "yape" | "plin" | "transfer";

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
    method: DeliveryMethod;
    address?: string;
    reference?: string;
    district?: string;
    shippingCost: number;
  };
  payment: {
    method: PaymentMethod;
    proofFileName?: string;
  };
  items: CartItem[];
  subtotal: number;
  total: number;
  createdAt: string;
};

/* ─── Wizard draft (one slice per step) ─── */

export type CheckoutStep = 1 | 2 | 3;

export type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
};

export type DeliveryData = {
  deliveryMethod: DeliveryMethod;
  address: string;
  reference: string;
  district: string;
};

export type PaymentData = {
  paymentMethod: PaymentMethod;
  proofFile: File | null;
};

const INITIAL_DRAFT: Pick<
  CheckoutStore,
  "step" | "contact" | "delivery" | "payment"
> = {
  step: 1,
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",
  },
  delivery: {
    deliveryMethod: "delivery",
    address: "",
    reference: "",
    district: "",
  },
  payment: {
    paymentMethod: "cash",
    proofFile: null,
  },
};

type CheckoutStore = {
  step: CheckoutStep;
  contact: ContactData;
  delivery: DeliveryData;
  payment: PaymentData;
  setStep: (step: CheckoutStep) => void;
  setContact: (contact: ContactData) => void;
  setDelivery: (delivery: Partial<DeliveryData>) => void;
  setPayment: (payment: PaymentData) => void;
  resetDraft: () => void;

  order: SubmittedOrder | null;
  submitOrder: (order: SubmittedOrder) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...INITIAL_DRAFT,
  setStep: (step) => set({ step }),
  setContact: (contact) => set({ contact }),
  setDelivery: (delivery) =>
    set((state) => ({ delivery: { ...state.delivery, ...delivery } })),
  setPayment: (payment) => set({ payment }),
  resetDraft: () => set(INITIAL_DRAFT),

  order: null,
  submitOrder: (order) => set({ order }),
  reset: () => set({ order: null }),
}));
