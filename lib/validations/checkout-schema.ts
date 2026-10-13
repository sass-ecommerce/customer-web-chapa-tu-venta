import { z } from "zod";

const NAME_REGEX = /^[\p{L}\s'-]+$/u;
// Peruvian mobile numbers: 9 digits starting with 9
const PHONE_REGEX = /^9\d{8}$/;
const DNI_REGEX = /^\d{8}$/;

const nameSchema = z
  .string()
  .trim()
  .min(1, "Requerido")
  .min(2, "Debe tener al menos 2 caracteres")
  .max(50, "Máximo 50 caracteres")
  .regex(NAME_REGEX, "Solo se permiten letras");

export const checkoutSchemas = {
  firstName: nameSchema,
  lastName: nameSchema,
  phone: z
    .string()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(
      z
        .string()
        .min(1, "Requerido")
        .regex(PHONE_REGEX, "Ingresa un celular válido de 9 dígitos"),
    ),
  email: z.string().trim().min(1, "Requerido").pipe(z.email("Email inválido")),
  dni: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || DNI_REGEX.test(v),
      "El DNI debe tener 8 dígitos",
    ),
  address: z
    .string()
    .trim()
    .min(1, "Requerido")
    .min(5, "Ingresa una dirección más completa")
    .max(150, "Máximo 150 caracteres"),
  reference: z.string().trim().max(150, "Máximo 150 caracteres"),
  district: (districts: string[]) =>
    z
      .string()
      .min(1, "Selecciona un distrito")
      .refine((v) => districts.includes(v), "Distrito inválido"),
  proofFile: z
    .instanceof(File, { message: "Debes subir tu comprobante de pago" })
    .nullable()
    .refine((f) => f !== null, "Debes subir tu comprobante de pago"),
};

/**
 * Wraps a zod schema as a TanStack Form field validator that returns the
 * first issue message, so `field.state.meta.errors` holds plain strings.
 */
export function zodField<T>(schema: z.ZodType<unknown, T>) {
  return {
    onDynamic: ({ value }: { value: T }) => {
      const result = schema.safeParse(value);
      return result.success ? undefined : result.error.issues[0]?.message;
    },
  };
}
