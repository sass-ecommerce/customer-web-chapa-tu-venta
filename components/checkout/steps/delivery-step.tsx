"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { MapPin, Package, Store } from "lucide-react";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { LIMA_DISTRICTS } from "@/lib/mocks/lima-districts";
import { checkoutSchemas, zodField } from "@/lib/validations/checkout-schema";
import { cn } from "@/lib/utils/utils";
import { Field, RadioCard, StepActions, TextInput } from "../checkout-fields";
import {
  DISTRICT_NAMES,
  REQUIRE_DELIVERY_ADDRESS,
  stepValidationLogic,
} from "../checkout-config";

export function DeliveryStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const delivery = useCheckoutStore((s) => s.delivery);
  const setDelivery = useCheckoutStore((s) => s.setDelivery);

  const form = useForm({
    defaultValues: delivery,
    validationLogic: stepValidationLogic,
    onSubmit: async ({ value }) => {
      // Step-specific side effects (e.g. shipping quote API) go here
      setDelivery({
        ...value,
        address: value.address.trim(),
        reference: value.reference.trim(),
      });
      onNext();
    },
  });
  const deliveryMethod = useSelector(
    form.store,
    (s) => s.values.deliveryMethod,
  );
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

  function handleBack() {
    // Keep what was typed (unvalidated) so it's there when coming back
    setDelivery(form.state.values);
    onBack();
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
        <div className="space-y-5">
          <div>
            <h2 className="text-brand-dark text-lg font-semibold">
              Método de entrega
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              ¿Cómo quieres recibir tu pedido?
            </p>
          </div>

          <form.Field
            name="deliveryMethod"
            listeners={{
              // Keep the order summary's shipping cost in sync while choosing
              onChange: ({ value }) => setDelivery({ deliveryMethod: value }),
            }}
          >
            {(field) => (
              <div className="space-y-3">
                <RadioCard
                  selected={field.state.value === "delivery"}
                  onClick={() => field.handleChange("delivery")}
                  icon={
                    <MapPin className="text-brand-accent size-4 shrink-0" />
                  }
                  title="Delivery a domicilio"
                  description="Entrega en tu dirección — S/ 15.00 en toda Lima"
                />
                <RadioCard
                  selected={field.state.value === "pickup"}
                  onClick={() => field.handleChange("pickup")}
                  icon={<Store className="size-4 shrink-0 text-gray-500" />}
                  title="Recojo en tienda"
                  description="Recoge gratis en nuestra tienda — coordinaremos contigo"
                />
              </div>
            )}
          </form.Field>

          {deliveryMethod === "delivery" && !REQUIRE_DELIVERY_ADDRESS ? (
            <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-brand-accent size-4 shrink-0" />
                <span className="text-brand-dark text-sm font-semibold">
                  Dirección de entrega
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                No necesitas ingresar tu dirección ahora. Una vez confirmado el
                pedido, nos comunicaremos contigo para coordinar la dirección y
                el horario de entrega.
              </p>
            </div>
          ) : deliveryMethod === "delivery" ? (
            <div className="space-y-4 pt-2">
              <form.Field
                name="address"
                validators={zodField(checkoutSchemas.address)}
              >
                {(field) => (
                  <TextInput
                    label="Dirección"
                    placeholder="Jr. Los Girasoles 123, Dpto. 201"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors[0]}
                  />
                )}
              </form.Field>

              <form.Field
                name="reference"
                validators={zodField(checkoutSchemas.reference)}
              >
                {(field) => (
                  <TextInput
                    label="Referencia"
                    optional
                    placeholder="Cerca al parque, casa color amarillo..."
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors[0]}
                  />
                )}
              </form.Field>

              <form.Field
                name="district"
                validators={zodField(checkoutSchemas.district(DISTRICT_NAMES))}
              >
                {(field) => {
                  const error = field.state.meta.errors[0];
                  return (
                    <Field label="Distrito" error={error}>
                      <div className="relative">
                        <select
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={!!error}
                          className={cn(
                            "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm",
                            "focus:ring-brand-accent/20 focus:border-brand-accent transition-colors focus:ring-2 focus:outline-none",
                            field.state.value
                              ? "text-brand-dark"
                              : "text-gray-400",
                            error ? "border-red-400" : "border-gray-200",
                          )}
                        >
                          <option value="">Selecciona tu distrito</option>
                          {LIMA_DISTRICTS.map((d) => (
                            <option key={d.name} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                          <svg
                            className="size-4 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      {field.state.value && !error && (
                        <p className="mt-1.5 text-xs text-gray-500">
                          Costo de envío:{" "}
                          <span className="text-brand-dark font-semibold">
                            S/ 15.00
                          </span>
                        </p>
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
          ) : (
            <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <Package className="text-brand-accent size-4 shrink-0" />
                <span className="text-brand-dark text-sm font-semibold">
                  Dirección de la tienda
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                Av. Ejemplo 456, Miraflores, Lima
              </p>
              <p className="text-xs text-gray-400">
                Lun – Sáb: 9 am – 7 pm · Dom: 10 am – 4 pm
              </p>
              <p className="mt-1 border-t border-gray-200 pt-2 text-xs text-gray-500">
                Una vez confirmado el pedido, nos comunicaremos contigo para
                coordinar el horario de recojo.
              </p>
            </div>
          )}
        </div>
      </div>

      <StepActions onBack={handleBack} isSubmitting={isSubmitting} />
    </form>
  );
}
