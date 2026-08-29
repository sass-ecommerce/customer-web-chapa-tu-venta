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
  const totalCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const totalPrice = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300",
          isSheetOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={closeSheet}
      />

      {/* Sheet: bottom on mobile, right drawer on desktop */}
      <div
        className={cn(
          "fixed z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out",
          // Mobile: bottom sheet
          "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl",
          // Desktop: side drawer
          "sm:inset-x-auto sm:top-0 sm:right-0 sm:bottom-0 sm:max-h-full sm:w-96 sm:rounded-none sm:rounded-l-2xl",
          // Open/close
          isSheetOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-x-full",
        )}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex shrink-0 justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-brand-accent size-5" />
            <h2 className="text-brand-dark font-semibold">
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
            className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
            aria-label="Cerrar carrito"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="mb-4 text-5xl select-none">🛒</span>
              <p className="text-brand-dark font-medium">
                Tu carrito está vacío
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Agrega productos desde el catálogo
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                {/* Image */}
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-brand-dark line-clamp-1 text-sm font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.product.category}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    S/ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Qty + remove */}
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                    <button
                      onClick={() =>
                        updateQty(item.product.id, item.quantity - 1)
                      }
                      className="px-2 py-1.5 text-gray-500 transition-colors hover:bg-gray-50"
                      aria-label="Quitar uno"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="min-w-[24px] px-2 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQty(item.product.id, item.quantity + 1)
                      }
                      className="px-2 py-1.5 text-gray-500 transition-colors hover:bg-gray-50"
                      aria-label="Agregar uno"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 text-gray-300 transition-colors hover:text-red-400"
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
          <div className="shrink-0 space-y-3 border-t border-gray-100 px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-brand-dark text-xl font-bold">
                S/ {totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={() => {
                closeSheet();
                router.push(tenantHref(tenant, "/checkout"));
              }}
              className="bg-brand-accent hover:bg-brand-accent-hover h-12 w-full rounded-xl border-0 text-base font-semibold text-white"
            >
              Ir al pago →
            </Button>
            <button
              onClick={clear}
              className="w-full py-1 text-xs text-gray-400 transition-colors hover:text-gray-600"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
