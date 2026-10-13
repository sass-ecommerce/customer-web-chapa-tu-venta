"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import {
  useCheckoutStore,
  type CheckoutStep,
} from "@/lib/stores/checkout-store";
import { tenantHref } from "@/lib/utils/tenant-href";
import { OrderSummary } from "./order-summary";
import { StepIndicator } from "./step-indicator";
import { ContactStep } from "./steps/contact-step";
import { DeliveryStep } from "./steps/delivery-step";
import { PaymentStep } from "./steps/payment-step";
import {
  DELIVERY_SHIPPING_COST,
  REQUIRE_DELIVERY_ADDRESS,
} from "./checkout-config";

export function CheckoutWizard() {
  const router = useRouter();
  const params = useParams();
  const tenant = params?.tenant as string;

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const step = useCheckoutStore((s) => s.step);
  const setStep = useCheckoutStore((s) => s.setStep);
  const deliveryMethod = useCheckoutStore((s) => s.delivery.deliveryMethod);
  const submitOrder = useCheckoutStore((s) => s.submitOrder);

  const shippingCost =
    deliveryMethod === "delivery" ? DELIVERY_SHIPPING_COST : 0;
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const total = subtotal + shippingCost;

  function goTo(next: CheckoutStep) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Called by the last step once its data is saved in the store
  function placeOrder() {
    const { contact, delivery, payment } = useCheckoutStore.getState();
    const withAddress =
      delivery.deliveryMethod === "delivery" && REQUIRE_DELIVERY_ADDRESS;

    submitOrder({
      orderId: `CTV-${Date.now().toString(36).toUpperCase()}`,
      buyer: contact,
      delivery: {
        method: delivery.deliveryMethod,
        address: withAddress ? delivery.address : undefined,
        reference: withAddress ? delivery.reference : undefined,
        district: withAddress ? delivery.district : undefined,
        shippingCost,
      },
      payment: {
        method: payment.paymentMethod,
        proofFileName: payment.proofFile?.name,
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
    <div className="min-h-screen bg-gray-50/70 px-0 pt-[116px] pb-16 sm:pb-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Back link */}
        <Link
          href={tenantHref(tenant, "/")}
          className="hover:text-brand-dark mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors"
        >
          <ChevronLeft className="size-4" />
          Seguir comprando
        </Link>

        {/* Mobile order summary */}
        <div className="mb-6 lg:hidden">
          <OrderSummary
            shippingCost={shippingCost}
            deliveryMethod={deliveryMethod}
          />
        </div>

        {/* Grid layout */}
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
          {/* Left: wizard */}
          <div className="space-y-5">
            {/* Step indicator */}
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5">
              <StepIndicator step={step} />
            </div>

            {/* Each step owns its form and saves to the checkout store */}
            {step === 1 && <ContactStep onNext={() => goTo(2)} />}
            {step === 2 && (
              <DeliveryStep onNext={() => goTo(3)} onBack={() => goTo(1)} />
            )}
            {step === 3 && (
              <>
                <PaymentStep onNext={placeOrder} onBack={() => goTo(2)} />
                <p className="text-center text-sm text-gray-500">
                  Total a pagar:{" "}
                  <span className="text-brand-dark font-bold">
                    S/ {total.toFixed(2)}
                  </span>
                </p>
              </>
            )}
          </div>

          {/* Right: order summary (desktop) */}
          <div className="hidden lg:block">
            <OrderSummary
              shippingCost={shippingCost}
              deliveryMethod={deliveryMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
