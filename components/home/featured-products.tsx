"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { tenantHref } from "@/lib/utils/tenant-href";
import type { DisplayProduct } from "@/lib/adapters/product-adapter";
import { ProductImage } from "@/components/home/product-image";

const tabs: {
  id: string;
  label: string;
  filter: (p: DisplayProduct) => boolean;
}[] = [
  {
    id: "best",
    label: "Mejor Vendido",
    filter: (p) => p.badge === "TOP" || p.rating >= 4.5,
  },
  {
    id: "discount",
    label: "Descuento",
    filter: (p) => p.badge === "OFERTA",
  },
  {
    id: "new",
    label: "Nuevos",
    filter: (p) => p.badge === "NUEVO",
  },
  {
    id: "featured",
    label: "Destacados",
    filter: (p) => p.rating >= 4.7,
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-xs text-yellow-400">
      {"★".repeat(full)}
      {half ? "½" : ""}
    </span>
  );
}

function ProductCard({
  product,
  tenant,
}: {
  product: DisplayProduct;
  tenant: string;
}) {
  const [wished, setWished] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-md">
      <Link
        href={tenantHref(tenant, `/products/${product.id}`)}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <ProductImage
            imageUrl={product.imageUrl}
            alt={product.name}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-3 -left-5 w-20 rotate-[-45deg] bg-[#EF4444] py-0.5 text-center text-[10px] font-bold tracking-wide text-white shadow-sm">
              {product.badge}
            </div>
          )}
          <button
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-transform hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              setWished(!wished);
            }}
            aria-label="Agregar a favoritos"
          >
            <Heart
              className="size-3.5"
              fill={wished ? "#EF4444" : "none"}
              stroke={wished ? "#EF4444" : "currentColor"}
            />
          </button>
        </div>

        <div className="space-y-1.5 p-3">
          <p className="line-clamp-2 text-xs leading-snug font-medium text-gray-800">
            {product.name}
          </p>
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-gray-900">
              S/ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export function FeaturedProducts({
  tenant,
  products,
}: {
  tenant: string;
  products: DisplayProduct[];
}) {
  const [activeTab, setActiveTab] = useState("best");

  if (products.length === 0) return null;

  const activeFilter =
    tabs.find((t) => t.id === activeTab)?.filter ?? (() => true);
  const activeProducts = products.filter(activeFilter);

  return (
    <section id="products" className="bg-[#F5F6F7] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-bold text-gray-900">Para Ti Hoy</h2>
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} tenant={tenant} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={tenantHref(tenant, "/catalog")}
            className="inline-block rounded-full border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
