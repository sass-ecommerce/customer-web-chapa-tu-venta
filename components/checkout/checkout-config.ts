import { revalidateLogic } from "@tanstack/react-form";
import { LIMA_DISTRICTS } from "@/lib/mocks/lima-districts";
import type { PaymentMethod } from "@/lib/stores/checkout-store";

// Not required for now; flip to true to show the fields again
export const SHOW_DNI_FIELD = false;
export const SHOW_EMAIL_FIELD = false;
// When false, delivery only asks for the method and the store coordinates the
// address with the buyer after the order is placed
export const REQUIRE_DELIVERY_ADDRESS = false;
// Per payment method: true makes the buyer upload the payment proof
// (screenshot / voucher) before placing the order; false only selects the
// method and the store validates the payment with the buyer afterwards.
// Cash is left out because it can't be proven online.
export const PAYMENT_PROOF_REQUIRED: Record<
  Exclude<PaymentMethod, "cash">,
  boolean
> = {
  yape: false,
  plin: false,
  transfer: false,
};

export function requiresPaymentProof(method: PaymentMethod) {
  return method !== "cash" && PAYMENT_PROOF_REQUIRED[method];
}

export const DELIVERY_SHIPPING_COST = 15;

export const DISTRICT_NAMES = LIMA_DISTRICTS.map((d) => d.name);

// Shared by every step form: validate on blur, and once the step was
// submitted, revalidate on change so errors clear as the user fixes them.
export const stepValidationLogic = revalidateLogic({
  mode: "blur",
  modeAfterSubmission: "change",
});
