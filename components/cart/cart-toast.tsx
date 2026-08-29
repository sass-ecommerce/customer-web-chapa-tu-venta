"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils/utils";

export function CartToast() {
  const lastAdded = useCartStore((s) => s.lastAdded);
  const openSheet = useCartStore((s) => s.openSheet);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2",
        "bg-brand-dark text-sm font-medium text-white",
        "flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl",
        "whitespace-nowrap transition-all duration-300",
        lastAdded
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {lastAdded?.image && (
        <img
          src={lastAdded.image}
          alt={lastAdded.name}
          className="h-8 w-8 shrink-0 rounded-lg object-cover"
        />
      )}
      <span className="max-w-[140px] truncate text-xs text-white/90">
        {lastAdded?.name}
      </span>
      <button
        onClick={openSheet}
        className="bg-brand-accent hover:bg-brand-accent-hover flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-colors"
      >
        <ShoppingCart className="size-3" />
        Ver carrito
      </button>
    </div>
  );
}
