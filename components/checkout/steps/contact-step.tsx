"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import {
  useCheckoutStore,
  type ContactData,
} from "@/lib/stores/checkout-store";
import { checkoutSchemas, zodField } from "@/lib/validations/checkout-schema";
import { StepActions, TextInput } from "../checkout-fields";
import {
  SHOW_DNI_FIELD,
  SHOW_EMAIL_FIELD,
  stepValidationLogic,
} from "../checkout-config";

export function ContactStep({ onNext }: { onNext: () => void }) {
  const contact = useCheckoutStore((s) => s.contact);
  const setContact = useCheckoutStore((s) => s.setContact);

  const form = useForm({
    defaultValues: contact,
    validationLogic: stepValidationLogic,
    onSubmit: async ({ value }) => {
      const data: ContactData = {
        ...value,
        firstName: value.firstName.trim(),
        lastName: value.lastName.trim(),
        email: value.email.trim(),
        phone: value.phone.replace(/[\s-]/g, ""),
        dni: value.dni.trim(),
      };
      // Step-specific side effects (e.g. an API call) go here
      setContact(data);
      onNext();
    },
  });
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

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
              Datos de contacto
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Te contactaremos para coordinar tu pedido.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field
              name="firstName"
              validators={zodField(checkoutSchemas.firstName)}
            >
              {(field) => (
                <TextInput
                  label="Nombre"
                  placeholder="Juan"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              )}
            </form.Field>

            <form.Field
              name="lastName"
              validators={zodField(checkoutSchemas.lastName)}
            >
              {(field) => (
                <TextInput
                  label="Apellido"
                  placeholder="Pérez"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
          </div>

          {SHOW_EMAIL_FIELD && (
            <form.Field
              name="email"
              validators={zodField(checkoutSchemas.email)}
            >
              {(field) => (
                <TextInput
                  label="Correo electrónico"
                  type="email"
                  placeholder="juan@email.com"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
          )}

          <form.Field name="phone" validators={zodField(checkoutSchemas.phone)}>
            {(field) => (
              <TextInput
                label="Teléfono / celular"
                type="tel"
                placeholder="999 123 456"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={field.state.meta.errors[0]}
              />
            )}
          </form.Field>

          {SHOW_DNI_FIELD && (
            <form.Field name="dni" validators={zodField(checkoutSchemas.dni)}>
              {(field) => (
                <TextInput
                  label="DNI"
                  optional
                  placeholder="12345678"
                  maxLength={8}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
          )}
        </div>
      </div>

      <StepActions isSubmitting={isSubmitting} />
    </form>
  );
}
