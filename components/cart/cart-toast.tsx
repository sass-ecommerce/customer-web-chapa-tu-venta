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
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-brand-dark text-white text-sm font-medium",
        "flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl",
        "transition-all duration-300 whitespace-nowrap",
        lastAdded
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      )}
    >
      {lastAdded?.image && (
        <img
          src={lastAdded.image}
          alt={lastAdded.name}
          className="w-8 h-8 rounded-lg object-cover shrink-0"
        />
      )}
      <span className="max-w-[140px] truncate text-white/90 text-xs">
        {lastAdded?.name}
      </span>
      <button
        onClick={openSheet}
        className="flex items-center gap-1.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors shrink-0"
      >
        <ShoppingCart className="size-3" />
        Ver carrito
      </button>
    </div>
  );
}
