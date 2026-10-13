import { revalidateLogic } from "@tanstack/react-form";
import { LIMA_DISTRICTS } from "@/lib/mocks/lima-districts";

// Not required for now; flip to true to show the fields again
export const SHOW_DNI_FIELD = false;
export const SHOW_EMAIL_FIELD = false;

export const DELIVERY_SHIPPING_COST = 15;

export const DISTRICT_NAMES = LIMA_DISTRICTS.map((d) => d.name);

// Shared by every step form: validate on blur, and once the step was
// submitted, revalidate on change so errors clear as the user fixes them.
export const stepValidationLogic = revalidateLogic({
  mode: "blur",
  modeAfterSubmission: "change",
});
