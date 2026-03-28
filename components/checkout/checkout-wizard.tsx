"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Banknote,
  Building2,
  Check,
  ChevronLeft,
  MapPin,
  Package,
  Smartphone,
  Store,
  Upload,
  X,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { tenantHref } from "@/lib/utils/tenant-href";
import { LIMA_DISTRICTS } from "@/lib/mocks/lima-districts";
import { OrderSummary } from "./order-summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";

/* ─── Types ─── */

type DeliveryMethod = "delivery" | "pickup";
type PaymentMethod = "cash" | "yape" | "plin" | "transfer";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  reference: string;
  district: string;
  paymentMethod: PaymentMethod;
  proofFile: File | null;
  proofPreview: string | null;
};

type Errors = Partial<Record<keyof FormData, string>>;

/* ─── Small helpers ─── */

function Field({
  label,
  error,
  children,
  optional,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {optional && (
          <span className="ml-1 text-xs font-normal text-gray-400">(opcional)</span>
        )}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function RadioCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-brand-accent bg-red-50/50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      )}
    >
      <div
        className={cn(
          "mt-0.5 size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
          selected ? "border-brand-accent" : "border-gray-300"
        )}
      >
        {selected && (
          <div className="size-2.5 rounded-full bg-brand-accent" />
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-brand-dark">{title}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </button>
  );
}

/* ─── Step indicator ─── */

const STEPS = [
  { n: 1, label: "Tus datos" },
  { n: 2, label: "Entrega" },
  { n: 3, label: "Pago" },
];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.n}>
          {i > 0 && (
            <div
              className={cn(
                "flex-1 h-px mx-2 transition-colors",
                step > i ? "bg-brand-accent" : "bg-gray-200"
              )}
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "size-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                step > s.n
                  ? "bg-brand-accent text-white"
                  : step === s.n
                  ? "bg-brand-accent text-white ring-4 ring-brand-accent/15"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {step > s.n ? <Check className="size-4" /> : s.n}
            </div>
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap",
                step >= s.n ? "text-brand-dark" : "text-gray-400"
              )}
            >
              {s.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Step 1: Buyer info ─── */

function StepBuyerInfo({
  form,
  errors,
  onChange,
}: {
  form: FormData;
  errors: Errors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-brand-dark">Datos de contacto</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Te contactaremos para coordinar tu pedido.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre" error={errors.firstName}>
          <Input
            value={form.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Juan"
            className={cn(
              "h-11 rounded-xl px-4 text-sm",
              errors.firstName && "border-red-400 focus-visible:border-red-400"
            )}
          />
        </Field>

        <Field label="Apellido" error={errors.lastName}>
          <Input
            value={form.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Pérez"
            className={cn(
              "h-11 rounded-xl px-4 text-sm",
              errors.lastName && "border-red-400 focus-visible:border-red-400"
            )}
          />
        </Field>
      </div>

      <Field label="Correo electrónico" error={errors.email}>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="juan@email.com"
          className={cn(
            "h-11 rounded-xl px-4 text-sm",
            errors.email && "border-red-400 focus-visible:border-red-400"
          )}
        />
      </Field>

      <Field label="Teléfono / celular" error={errors.phone}>
        <Input
          type="tel"
          value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="999 123 456"
          className={cn(
            "h-11 rounded-xl px-4 text-sm",
            errors.phone && "border-red-400 focus-visible:border-red-400"
          )}
        />
      </Field>

      <Field label="DNI" error={errors.dni} optional>
        <Input
          value={form.dni}
          onChange={(e) => onChange("dni", e.target.value)}
          placeholder="12345678"
          maxLength={8}
          className="h-11 rounded-xl px-4 text-sm"
        />
      </Field>
    </div>
  );
}

/* ─── Step 2: Delivery ─── */

function StepDelivery({
  form,
  errors,
  onChange,
}: {
  form: FormData;
  errors: Errors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-brand-dark">Método de entrega</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          ¿Cómo quieres recibir tu pedido?
        </p>
      </div>

      <div className="space-y-3">
        <RadioCard
          selected={form.deliveryMethod === "delivery"}
          onClick={() => onChange("deliveryMethod", "delivery")}
          icon={<MapPin className="size-4 text-brand-accent shrink-0" />}
          title="Delivery a domicilio"
          description="Entrega en tu dirección — S/ 15.00 en toda Lima"
        />
        <RadioCard
          selected={form.deliveryMethod === "pickup"}
          onClick={() => onChange("deliveryMethod", "pickup")}
          icon={<Store className="size-4 text-gray-500 shrink-0" />}
          title="Recojo en tienda"
          description="Recoge gratis en nuestra tienda — coordinaremos contigo"
        />
      </div>

      {form.deliveryMethod === "delivery" ? (
        <div className="space-y-4 pt-2">
          <Field label="Dirección" error={errors.address}>
            <Input
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
              placeholder="Jr. Los Girasoles 123, Dpto. 201"
              className={cn(
                "h-11 rounded-xl px-4 text-sm",
                errors.address && "border-red-400 focus-visible:border-red-400"
              )}
            />
          </Field>

          <Field label="Referencia" optional>
            <Input
              value={form.reference}
              onChange={(e) => onChange("reference", e.target.value)}
              placeholder="Cerca al parque, casa color amarillo..."
              className="h-11 rounded-xl px-4 text-sm"
            />
          </Field>

          <Field label="Distrito" error={errors.district}>
            <div className="relative">
              <select
                value={form.district}
                onChange={(e) => onChange("district", e.target.value)}
                className={cn(
                  "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-colors",
                  form.district ? "text-brand-dark" : "text-gray-400",
                  errors.district ? "border-red-400" : "border-gray-200"
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
                <svg className="size-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {form.district && !errors.district && (
              <p className="mt-1.5 text-xs text-gray-500">
                Costo de envío:{" "}
                <span className="font-semibold text-brand-dark">S/ 15.00</span>
              </p>
            )}
          </Field>
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-brand-accent shrink-0" />
            <span className="text-sm font-semibold text-brand-dark">
              Dirección de la tienda
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Av. Ejemplo 456, Miraflores, Lima
          </p>
          <p className="text-xs text-gray-400">
            Lun – Sáb: 9 am – 7 pm · Dom: 10 am – 4 pm
          </p>
          <p className="text-xs text-gray-500 mt-1 border-t border-gray-200 pt-2">
            Una vez confirmado el pedido, nos comunicaremos contigo para coordinar el
            horario de recojo.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Step 3: Payment ─── */

const PAYMENT_METHODS: {
  id: PaymentMethod;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: "cash",
    icon: <Banknote className="size-4 text-green-600 shrink-0" />,
    title: "Contra entrega (efectivo)",
    description: "Paga en efectivo cuando recibas tu pedido",
  },
  {
    id: "yape",
    icon: <Smartphone className="size-4 text-purple-600 shrink-0" />,
    title: "Yape",
    description: "Paga con Yape y sube tu captura para validación",
  },
  {
    id: "plin",
    icon: <Smartphone className="size-4 text-green-500 shrink-0" />,
    title: "Plin",
    description: "Paga con Plin y sube tu captura para validación",
  },
  {
    id: "transfer",
    icon: <Building2 className="size-4 text-blue-600 shrink-0" />,
    title: "Transferencia bancaria",
    description: "Transfiere a nuestra cuenta y envíanos el voucher",
  },
];

function StepPayment({
  form,
  errors,
  onChange,
  onFileChange,
  onClearProof,
  fileInputRef,
}: {
  form: FormData;
  errors: Errors;
  onChange: (field: keyof FormData, value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearProof: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-brand-dark">Método de pago</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Selecciona cómo quieres pagar.
        </p>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((m) => (
          <RadioCard
            key={m.id}
            selected={form.paymentMethod === m.id}
            onClick={() => onChange("paymentMethod", m.id)}
            icon={m.icon}
            title={m.title}
            description={m.description}
          />
        ))}
      </div>

      {/* Yape / Plin details */}
      {(form.paymentMethod === "yape" || form.paymentMethod === "plin") && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-brand-dark">
              {form.paymentMethod === "yape" ? "Yapea al número" : "Plínea al número"}
            </p>
            <p className="text-2xl font-bold text-brand-dark tracking-widest mt-1">
              999 999 999
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Titular: Tienda Demo S.A.C.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs font-medium text-gray-600 mb-3 text-center">
              Sube tu captura de pantalla del pago para validación manual
            </p>

            {/* Upload area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors",
                form.proofPreview
                  ? "border-brand-accent/40 bg-red-50/30"
                  : errors.proofFile
                  ? "border-red-400 bg-red-50/20"
                  : "border-gray-300 hover:border-brand-accent/40 hover:bg-gray-100/50"
              )}
            >
              {form.proofPreview ? (
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.proofPreview}
                    alt="Comprobante de pago"
                    className="max-h-36 rounded-lg mx-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearProof();
                    }}
                    className="absolute -top-2 -right-2 size-5 rounded-full bg-brand-accent text-white flex items-center justify-center"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Upload className="size-8 text-gray-300" />
                  <p className="text-sm text-gray-500 font-medium">
                    Toca para subir tu captura
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG (máx. 5 MB)</p>
                </div>
              )}
            </div>
            {errors.proofFile && (
              <p className="mt-1.5 text-xs text-red-500">{errors.proofFile}</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        </div>
      )}

      {/* Transfer details */}
      {form.paymentMethod === "transfer" && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-3">
          <p className="text-sm font-semibold text-brand-dark">
            Datos para la transferencia
          </p>
          <div className="space-y-2 text-sm">
            {[
              ["Banco", "BCP"],
              ["Titular", "Tienda Demo S.A.C."],
              ["N° de cuenta", "191-12345678-0-12"],
              ["CCI", "002-191-012345678012-19"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-brand-dark">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 border-t border-gray-200 pt-3">
            Una vez realizada la transferencia, guarda el comprobante. Te pediremos el número de operación para confirmar tu pedido.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main wizard ─── */

export function CheckoutWizard() {
  const router = useRouter();
  const params = useParams();
  const tenant = params?.tenant as string;

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const submitOrder = useCheckoutStore((s) => s.submitOrder);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",
    deliveryMethod: "delivery",
    address: "",
    reference: "",
    district: "",
    paymentMethod: "cash",
    proofFile: null,
    proofPreview: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const shippingCost = form.deliveryMethod === "delivery" ? 15 : 0;
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const total = subtotal + shippingCost;

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, proofFile: file, proofPreview: preview }));
    if (errors.proofFile) setErrors((prev) => ({ ...prev, proofFile: undefined }));
  }

  function handleClearProof() {
    if (form.proofPreview) URL.revokeObjectURL(form.proofPreview);
    setForm((prev) => ({ ...prev, proofFile: null, proofPreview: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validateStep(s: number): boolean {
    const newErrors: Errors = {};

    if (s === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "Requerido";
      if (!form.lastName.trim()) newErrors.lastName = "Requerido";
      if (!form.email.trim()) newErrors.email = "Requerido";
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";
      if (!form.phone.trim()) newErrors.phone = "Requerido";
    }

    if (s === 2 && form.deliveryMethod === "delivery") {
      if (!form.address.trim()) newErrors.address = "Requerido";
      if (!form.district) newErrors.district = "Selecciona un distrito";
    }

    if (s === 3) {
      if (
        (form.paymentMethod === "yape" || form.paymentMethod === "plin") &&
        !form.proofFile
      ) {
        newErrors.proofFile = "Debes subir tu comprobante de pago";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit() {
    if (!validateStep(3)) return;

    const orderId = `CTV-${Date.now().toString(36).toUpperCase()}`;

    submitOrder({
      orderId,
      buyer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        dni: form.dni,
      },
      delivery: {
        method: form.deliveryMethod,
        address: form.deliveryMethod === "delivery" ? form.address : undefined,
        reference: form.deliveryMethod === "delivery" ? form.reference : undefined,
        district: form.deliveryMethod === "delivery" ? form.district : undefined,
        shippingCost,
      },
      payment: {
        method: form.paymentMethod,
        proofFileName: form.proofFile?.name,
      },
      items: items.map((i) => ({ ...i })),
      subtotal,
      total,
      createdAt: new Date().toISOString(),
    });

    clearCart();
    router.push(tenantHref(tenant, "/checkout/confirmation"));
  }

  return (
    <div className="min-h-screen bg-gray-50/70 pt-[116px] pb-16 sm:pb-8 px-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link
          href={tenantHref(tenant, "/")}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-dark transition-colors mb-6"
        >
          <ChevronLeft className="size-4" />
          Seguir comprando
        </Link>

        {/* Mobile order summary */}
        <div className="lg:hidden mb-6">
          <OrderSummary shippingCost={shippingCost} deliveryMethod={form.deliveryMethod} />
        </div>

        {/* Grid layout */}
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 lg:items-start">
          {/* Left: wizard */}
          <div className="space-y-5">
            {/* Step indicator */}
            <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5">
              <StepIndicator step={step} />
            </div>

            {/* Step content */}
            <div className="bg-white rounded-2xl border border-gray-200 px-6 py-6">
              {step === 1 && (
                <StepBuyerInfo form={form} errors={errors} onChange={handleChange} />
              )}
              {step === 2 && (
                <StepDelivery form={form} errors={errors} onChange={handleChange} />
              )}
              {step === 3 && (
                <StepPayment
                  form={form}
                  errors={errors}
                  onChange={handleChange}
                  onFileChange={handleFileChange}
                  onClearProof={handleClearProof}
                  fileInputRef={fileInputRef}
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="h-12 px-5 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <ChevronLeft className="size-4 mr-1" />
                  Anterior
                </Button>
              )}
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 h-12 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-base border-0"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-12 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-base border-0"
                >
                  Confirmar pedido →
                </Button>
              )}
            </div>

            {/* Total on mobile before confirm */}
            {step === 3 && (
              <p className="text-center text-sm text-gray-500">
                Total a pagar:{" "}
                <span className="font-bold text-brand-dark">S/ {total.toFixed(2)}</span>
              </p>
            )}
          </div>

          {/* Right: order summary (desktop) */}
          <div className="hidden lg:block">
            <OrderSummary shippingCost={shippingCost} deliveryMethod={form.deliveryMethod} />
          </div>
        </div>
      </div>
    </div>
  );
}
