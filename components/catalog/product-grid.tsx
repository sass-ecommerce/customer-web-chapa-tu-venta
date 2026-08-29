"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import type { MockProduct } from "@/lib/mocks/mock-products";
import { tenantHref } from "@/lib/utils/tenant-href";
import { useCartStore } from "@/lib/stores/cart-store";

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
                  : "text-gray-300",
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

function ProductBadge({
  badge,
  discount,
}: {
  badge?: string;
  discount?: number;
}) {
  if (!badge) return null;
  return (
    <span
      className={cn(
        "absolute top-3 left-3 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold text-white",
        badge === "NUEVO" && "bg-green-500",
        badge === "TOP" && "bg-brand-dark",
        badge === "OFERTA" && "bg-brand-accent",
      )}
    >
      {badge === "OFERTA" && discount ? `-${discount}%` : badge}
    </span>
  );
}

function ProductCardGrid({
  product,
  tenant,
}: {
  product: MockProduct;
  tenant: string;
}) {
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
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-md">
      {/* Image */}
      <Link
        href={tenantHref(tenant, `/products/${product.id}`)}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <ProductBadge badge={product.badge} discount={product.discount} />
          <button
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              setWished(!wished);
            }}
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
      <Link
        href={tenantHref(tenant, `/products/${product.id}`)}
        className="block space-y-2.5 p-4"
      >
        <div>
          <p className="mb-0.5 text-xs tracking-wide text-gray-400 uppercase">
            {product.category}
          </p>
          <h3 className="text-brand-dark line-clamp-2 text-sm leading-snug font-semibold">
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
              "rounded-xl border-0 text-white transition-colors duration-300",
              added
                ? "bg-green-500 hover:bg-green-500"
                : "bg-brand-accent hover:bg-brand-accent-hover",
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

function ProductCardList({
  product,
  tenant,
}: {
  product: MockProduct;
  tenant: string;
}) {
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
      className="group flex items-stretch overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative w-28 shrink-0 overflow-hidden bg-gray-50 sm:w-36">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <ProductBadge badge={product.badge} discount={product.discount} />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div className="space-y-1">
          <p className="text-xs tracking-wide text-gray-400 uppercase">
            {product.category}
          </p>
          <h3 className="text-brand-dark line-clamp-1 text-sm font-semibold">
            {product.name}
          </h3>
          <StarRating rating={product.rating} />
          <p className="hidden text-xs text-gray-400 sm:block">
            {product.reviewCount} reseñas
          </p>
        </div>
      </div>

      {/* Price + action */}
      <div className="flex shrink-0 flex-col items-end justify-between p-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished(!wished);
          }}
          className="hover:text-brand-accent text-gray-300 transition-colors"
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
              "border-0 text-xs text-white transition-colors duration-300",
              added
                ? "bg-green-500 hover:bg-green-500"
                : "bg-brand-accent hover:bg-brand-accent-hover",
            )}
            onClick={handleAddToCart}
          >
            {added ? (
              <Check className="size-3" />
            ) : (
              <ShoppingCart className="size-3" />
            )}
            <span className="ml-1 hidden sm:inline">
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
        <span className="mb-4 text-6xl select-none">🔍</span>
        <h3 className="text-brand-dark font-display mb-2 text-xl font-semibold">
          Sin resultados
        </h3>
        <p className="mb-6 max-w-xs text-sm text-gray-500">
          No encontramos productos con los filtros seleccionados. Intenta
          ajustar tu búsqueda.
        </p>
        <Button
          onClick={onClearFilters}
          className="bg-brand-accent hover:bg-brand-accent-hover border-0 text-white"
        >
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {visible.map((product) => (
            <ProductCardGrid
              key={product.id}
              product={product}
              tenant={tenant}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((product) => (
            <ProductCardList
              key={product.id}
              product={product}
              tenant={tenant}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="pt-2 text-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="rounded-full px-8 font-medium"
          >
            Ver más productos ▼
          </Button>
        </div>
      )}
    </div>
  );
}
