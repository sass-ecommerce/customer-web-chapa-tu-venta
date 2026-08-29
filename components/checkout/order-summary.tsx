"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils/utils";

type Props = {
  shippingCost: number;
  deliveryMethod: "delivery" | "pickup";
};

function SummaryContent({ shippingCost, deliveryMethod }: Props) {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const total = subtotal + shippingCost;

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gray-100 text-xl select-none">
                {item.product.image}
              </div>
              <span className="bg-brand-accent absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-brand-dark line-clamp-1 text-sm font-medium">
                {item.product.name}
              </p>
              <p className="text-xs text-gray-400">{item.product.category}</p>
            </div>
            <span className="text-brand-dark shrink-0 text-sm font-semibold">
              S/ {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-brand-dark">S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Envío</span>
          <span
            className={cn(
              "font-medium",
              shippingCost === 0 ? "text-green-600" : "text-brand-dark",
            )}
          >
            {deliveryMethod === "pickup"
              ? "Gratis (recojo)"
              : `S/ ${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-2">
          <span className="text-brand-dark font-semibold">Total</span>
          <span className="text-brand-dark text-lg font-bold">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function OrderSummary({ shippingCost, deliveryMethod }: Props) {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const total = subtotal + shippingCost;

  return (
    <>
      {/* Mobile accordion */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <div className="text-brand-dark flex items-center gap-2 text-sm font-medium">
            <ShoppingBag className="text-brand-accent size-4" />
            {open ? "Ocultar" : "Ver"} resumen del pedido
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-dark text-sm font-bold">
              S/ {total.toFixed(2)}
            </span>
            {open ? (
              <ChevronUp className="size-4 text-gray-400" />
            ) : (
              <ChevronDown className="size-4 text-gray-400" />
            )}
          </div>
        </button>
        {open && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
            <SummaryContent
              shippingCost={shippingCost}
              deliveryMethod={deliveryMethod}
            />
          </div>
        )}
      </div>

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-brand-dark mb-5 flex items-center gap-2 font-semibold">
            <ShoppingBag className="text-brand-accent size-4" />
            Resumen del pedido
          </h3>
          <SummaryContent
            shippingCost={shippingCost}
            deliveryMethod={deliveryMethod}
          />
        </div>
      </div>
    </>
  );
}
