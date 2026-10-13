"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, useSelector } from "@tanstack/react-form";
import { Banknote, Building2, Smartphone, Upload, X } from "lucide-react";
import {
  useCheckoutStore,
  type PaymentMethod,
} from "@/lib/stores/checkout-store";
import { checkoutSchemas, zodField } from "@/lib/validations/checkout-schema";
import { cn } from "@/lib/utils/utils";
import { RadioCard, StepActions } from "../checkout-fields";
import { stepValidationLogic } from "../checkout-config";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: "cash",
    icon: <Banknote className="size-4 shrink-0 text-green-600" />,
    title: "Contra entrega (efectivo)",
    description: "Paga en efectivo cuando recibas tu pedido",
  },
  {
    id: "yape",
    icon: <Smartphone className="size-4 shrink-0 text-purple-600" />,
    title: "Yape",
    description: "Paga con Yape y sube tu captura para validación",
  },
  {
    id: "plin",
    icon: <Smartphone className="size-4 shrink-0 text-green-500" />,
    title: "Plin",
    description: "Paga con Plin y sube tu captura para validación",
  },
  {
    id: "transfer",
    icon: <Building2 className="size-4 shrink-0 text-blue-600" />,
    title: "Transferencia bancaria",
    description: "Transfiere a nuestra cuenta y envíanos el voucher",
  },
];

/** Data URL for previewing a local image file. */
function useFilePreview(file: File | null) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file]);
  return file ? preview : null;
}

export function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: () => void | Promise<void>;
  onBack: () => void;
}) {
  const payment = useCheckoutStore((s) => s.payment);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: payment,
    validationLogic: stepValidationLogic,
    onSubmit: async ({ value }) => {
      const needsProof =
        value.paymentMethod === "yape" || value.paymentMethod === "plin";
      // Step-specific side effects (e.g. uploading the proof) go here
      setPayment({ ...value, proofFile: needsProof ? value.proofFile : null });
      await onNext();
    },
  });
  const paymentMethod = useSelector(form.store, (s) => s.values.paymentMethod);
  const proofFile = useSelector(form.store, (s) => s.values.proofFile);
  const proofPreview = useFilePreview(proofFile);
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

  function handleBack() {
    setPayment(form.state.values);
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
              Método de pago
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Selecciona cómo quieres pagar.
            </p>
          </div>

          <form.Field name="paymentMethod">
            {(field) => (
              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <RadioCard
                    key={m.id}
                    selected={field.state.value === m.id}
                    onClick={() => field.handleChange(m.id)}
                    icon={m.icon}
                    title={m.title}
                    description={m.description}
                  />
                ))}
              </div>
            )}
          </form.Field>

          {/* Yape / Plin details */}
          {(paymentMethod === "yape" || paymentMethod === "plin") && (
            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="text-center">
                <p className="text-brand-dark text-sm font-semibold">
                  {paymentMethod === "yape"
                    ? "Yapea al número"
                    : "Plínea al número"}
                </p>
                <p className="text-brand-dark mt-1 text-2xl font-bold tracking-widest">
                  999 999 999
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Titular: Tienda Demo S.A.C.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="mb-3 text-center text-xs font-medium text-gray-600">
                  Sube tu captura de pantalla del pago para validación manual
                </p>

                <form.Field
                  name="proofFile"
                  validators={zodField(checkoutSchemas.proofFile)}
                >
                  {(field) => {
                    const error = field.state.meta.errors[0];
                    return (
                      <>
                        {/* Upload area */}
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={cn(
                            "relative cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-colors",
                            proofPreview
                              ? "border-brand-accent/40 bg-red-50/30"
                              : error
                                ? "border-red-400 bg-red-50/20"
                                : "hover:border-brand-accent/40 border-gray-300 hover:bg-gray-100/50",
                          )}
                        >
                          {proofPreview ? (
                            <div className="relative inline-block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={proofPreview}
                                alt="Comprobante de pago"
                                className="mx-auto max-h-36 rounded-lg object-contain"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (fileInputRef.current)
                                    fileInputRef.current.value = "";
                                  field.handleChange(null);
                                }}
                                className="bg-brand-accent absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full text-white"
                              >
                                <X className="size-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 py-2">
                              <Upload className="size-8 text-gray-300" />
                              <p className="text-sm font-medium text-gray-500">
                                Toca para subir tu captura
                              </p>
                              <p className="text-xs text-gray-400">
                                JPG, PNG (máx. 5 MB)
                              </p>
                            </div>
                          )}
                        </div>
                        {error && (
                          <p className="mt-1.5 text-xs text-red-500">{error}</p>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            field.handleChange(file);
                            field.handleBlur();
                          }}
                        />
                      </>
                    );
                  }}
                </form.Field>
              </div>
            </div>
          )}

          {/* Transfer details */}
          {paymentMethod === "transfer" && (
            <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-brand-dark text-sm font-semibold">
                Datos para la transferencia
              </p>
              <div className="space-y-2 text-sm">
                {[
                  ["Banco", "BCP"],
                  ["Titular", "Tienda Demo S.A.C."],
                  ["N° de cuenta", "191-12345678-0-12"],
                  ["CCI", "002-191-012345678012-19"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-500">{label}</span>
                    <span className="text-brand-dark font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <p className="border-t border-gray-200 pt-3 text-xs text-gray-400">
                Una vez realizada la transferencia, guarda el comprobante. Te
                pediremos el número de operación para confirmar tu pedido.
              </p>
            </div>
          )}
        </div>
      </div>

      <StepActions
        onBack={handleBack}
        submitLabel="Confirmar pedido →"
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
