"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MockProduct } from "@/lib/mock-products";
import { tenantHref } from "@/lib/tenant-href";
import { useCartStore } from "@/lib/cart-store";

const ITEMS_PER_PAGE = 9;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={cn(
              "text-xs",
              star <= Math.floor(rating)
                ? "text-yellow-400"
                : star - 0.5 <= rating
                ? "text-yellow-400 opacity-50"
                : "text-gray-300"
            )}
          >
            ★
          </span>
        ))}
      </span>
      <span className="text-xs text-gray-400">({rating})</span>
    </div>
  );
}

function ProductBadge({ badge, discount }: { badge?: string; discount?: number }) {
  if (!badge) return null;
  return (
    <span
      className={cn(
        "absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10",
        badge === "NUEVO" && "bg-green-500",
        badge === "TOP" && "bg-brand-dark",
        badge === "OFERTA" && "bg-brand-accent"
      )}
    >
      {badge === "OFERTA" && discount ? `-${discount}%` : badge}
    </span>
  );
}

function ProductCardGrid({ product, tenant }: { product: MockProduct; tenant: string }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <Link href={tenantHref(tenant, `/products/${product.id}`)} className="block">
        <div className="relative overflow-hidden bg-gray-50 aspect-square flex items-center justify-center">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300 select-none">
            {product.image}
          </span>
          <ProductBadge badge={product.badge} discount={product.discount} />
          <button
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm"
            onClick={(e) => { e.preventDefault(); setWished(!wished); }}
            aria-label="Agregar a favoritos"
          >
            <Heart
              className="size-4"
              fill={wished ? "#EF4444" : "none"}
              stroke={wished ? "#EF4444" : "currentColor"}
            />
          </button>
        </div>
      </Link>

      {/* Info */}
      <Link href={tenantHref(tenant, `/products/${product.id}`)} className="block p-4 space-y-2.5">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-brand-dark line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        <StarRating rating={product.rating} />

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              S/ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="icon-sm"
            className={cn(
              "rounded-xl text-white border-0 transition-colors duration-300",
              added
                ? "bg-green-500 hover:bg-green-500"
                : "bg-brand-accent hover:bg-brand-accent-hover"
            )}
            aria-label="Agregar al carrito"
            onClick={handleAddToCart}
          >
            {added ? (
              <Check className="size-3.5" />
            ) : (
              <ShoppingCart className="size-3.5" />
            )}
          </Button>
        </div>
      </Link>
    </div>
  );
}

function ProductCardList({ product, tenant }: { product: MockProduct; tenant: string }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={tenantHref(tenant, `/products/${product.id}`)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 flex items-stretch"
    >
      {/* Image */}
      <div className="relative w-28 sm:w-36 shrink-0 bg-gray-50 flex items-center justify-center overflow-hidden">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
          {product.image}
        </span>
        <ProductBadge badge={product.badge} discount={product.discount} />
      </div>

      {/* Info */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div className="space-y-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-brand-dark line-clamp-1">
            {product.name}
          </h3>
          <StarRating rating={product.rating} />
          <p className="text-xs text-gray-400 hidden sm:block">
            {product.reviewCount} reseñas
          </p>
        </div>
      </div>

      {/* Price + action */}
      <div className="flex flex-col items-end justify-between p-4 shrink-0">
        <button
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          className="text-gray-300 hover:text-brand-accent transition-colors"
          aria-label="Agregar a favoritos"
        >
          <Heart
            className="size-4"
            fill={wished ? "#EF4444" : "none"}
            stroke={wished ? "#EF4444" : "currentColor"}
          />
        </button>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-base font-bold text-gray-900">
              S/ {product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                S/ {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <Button
            size="sm"
            className={cn(
              "text-white border-0 text-xs transition-colors duration-300",
              added
                ? "bg-green-500 hover:bg-green-500"
                : "bg-brand-accent hover:bg-brand-accent-hover"
            )}
            onClick={handleAddToCart}
          >
            {added ? (
              <Check className="size-3" />
            ) : (
              <ShoppingCart className="size-3" />
            )}
            <span className="hidden sm:inline ml-1">
              {added ? "Agregado" : "Agregar"}
            </span>
          </Button>
        </div>
      </div>
    </Link>
  );
}

type ProductGridProps = {
  products: MockProduct[];
  viewMode: "grid" | "list";
  page: number;
  tenant: string;
  onLoadMore: () => void;
  onClearFilters: () => void;
};

export function ProductGrid({
  products,
  viewMode,
  page,
  tenant,
  onLoadMore,
  onClearFilters,
}: ProductGridProps) {
  const visibleCount = page * ITEMS_PER_PAGE;
  const visible = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-4 select-none">🔍</span>
        <h3 className="text-xl font-semibold text-brand-dark mb-2 font-display">
          Sin resultados
        </h3>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          No encontramos productos con los filtros seleccionados. Intenta
          ajustar tu búsqueda.
        </p>
        <Button
          onClick={onClearFilters}
          className="bg-brand-accent hover:bg-brand-accent-hover text-white border-0"
        >
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visible.map((product) => (
            <ProductCardGrid key={product.id} product={product} tenant={tenant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((product) => (
            <ProductCardList key={product.id} product={product} tenant={tenant} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="text-center pt-2">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="px-8 rounded-full font-medium"
          >
            Ver más productos ▼
          </Button>
        </div>
      )}
    </div>
  );
}
