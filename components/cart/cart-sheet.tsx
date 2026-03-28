"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useCartStore } from "@/lib/stores/cart-store";
import { tenantHref } from "@/lib/utils/tenant-href";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

export function CartSheet() {
  const router = useRouter();
  const params = useParams();
  const tenant = params?.tenant as string;

  const items = useCartStore((s) => s.items);
  const isSheetOpen = useCartStore((s) => s.isSheetOpen);
  const closeSheet = useCartStore((s) => s.closeSheet);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clear = useCartStore((s) => s.clear);
  const totalCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const totalPrice = useCartStore((s) => s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0));

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
          isSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSheet}
      />

      {/* Sheet: bottom on mobile, right drawer on desktop */}
      <div
        className={cn(
          "fixed z-50 bg-white flex flex-col transition-transform duration-300 ease-in-out",
          // Mobile: bottom sheet
          "inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh]",
          // Desktop: side drawer
          "sm:inset-x-auto sm:right-0 sm:top-0 sm:bottom-0 sm:w-96 sm:max-h-full sm:rounded-none sm:rounded-l-2xl",
          // Open/close
          isSheetOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-x-full"
        )}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-brand-accent" />
            <h2 className="font-semibold text-brand-dark">
              Mi Carrito
              {totalCount > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({totalCount} {totalCount === 1 ? "producto" : "productos"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeSheet}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-5xl mb-4 select-none">🛒</span>
              <p className="font-medium text-brand-dark">Tu carrito está vacío</p>
              <p className="text-gray-400 text-xs mt-1">
                Agrega productos desde el catálogo
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                {/* Image */}
                <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-dark line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.product.category}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    S/ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Qty + remove */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="px-2 py-1.5 hover:bg-gray-50 transition-colors text-gray-500"
                      aria-label="Quitar uno"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="px-2 text-sm font-medium min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="px-2 py-1.5 hover:bg-gray-50 transition-colors text-gray-500"
                      aria-label="Agregar uno"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-xl font-bold text-brand-dark">
                S/ {totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={() => {
                closeSheet();
                router.push(tenantHref(tenant, "/checkout"));
              }}
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white border-0 h-12 text-base font-semibold rounded-xl"
            >
              Ir al pago →
            </Button>
            <button
              onClick={clear}
              className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
