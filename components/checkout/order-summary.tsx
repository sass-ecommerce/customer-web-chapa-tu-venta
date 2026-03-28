"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils/utils";

type Props = {
  shippingCost: number;
  deliveryMethod: "delivery" | "pickup";
};

function SummaryContent({
  shippingCost,
  deliveryMethod,
}: Props) {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="size-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl select-none">
                {item.product.image}
              </div>
              <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-brand-dark line-clamp-1">
                {item.product.name}
              </p>
              <p className="text-xs text-gray-400">{item.product.category}</p>
            </div>
            <span className="text-sm font-semibold text-brand-dark shrink-0">
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
          <span className={cn("font-medium", shippingCost === 0 ? "text-green-600" : "text-brand-dark")}>
            {deliveryMethod === "pickup" ? "Gratis (recojo)" : `S/ ${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <span className="font-semibold text-brand-dark">Total</span>
          <span className="text-lg font-bold text-brand-dark">S/ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export function OrderSummary({ shippingCost, deliveryMethod }: Props) {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <>
      {/* Mobile accordion */}
      <div className="lg:hidden rounded-2xl border border-gray-200 overflow-hidden bg-white">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <ShoppingBag className="size-4 text-brand-accent" />
            {open ? "Ocultar" : "Ver"} resumen del pedido
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-brand-dark">
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
          <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
            <SummaryContent shippingCost={shippingCost} deliveryMethod={deliveryMethod} />
          </div>
        )}
      </div>

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-brand-dark mb-5 flex items-center gap-2">
            <ShoppingBag className="size-4 text-brand-accent" />
            Resumen del pedido
          </h3>
          <SummaryContent shippingCost={shippingCost} deliveryMethod={deliveryMethod} />
        </div>
      </div>
    </>
  );
}
