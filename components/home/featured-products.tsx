"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { tenantHref } from "@/lib/utils/tenant-href";
import {
  mockProducts,
  getProductsByBadge,
  type MockProduct,
} from "@/lib/mocks/mock-products";

const tabs = [
  {
    id: "best",
    label: "Mejor Vendido",
    products: mockProducts.filter((p) => p.badge === "TOP" || p.rating >= 4.5),
  },
  {
    id: "discount",
    label: "Descuento",
    products: getProductsByBadge("OFERTA"),
  },
  {
    id: "new",
    label: "Nuevos",
    products: getProductsByBadge("NUEVO"),
  },
  {
    id: "featured",
    label: "Destacados",
    products: mockProducts.filter((p) => p.rating >= 4.7),
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-yellow-400 text-xs">
      {"★".repeat(full)}
      {half ? "½" : ""}
    </span>
  );
}

function ProductCard({
  product,
  tenant,
}: {
  product: MockProduct;
  tenant: string;
}) {
  const [wished, setWished] = useState(false);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
      <Link
        href={tenantHref(tenant, `/products/${product.id}`)}
        className="block"
      >
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <div className="absolute top-3 -left-5 w-20 bg-[#EF4444] text-white text-[10px] font-bold text-center py-0.5 rotate-[-45deg] shadow-sm tracking-wide">
              {product.badge}
            </div>
          )}
          <button
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
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

        <div className="p-3 space-y-1.5">
          <p className="text-xs text-gray-800 font-medium line-clamp-2 leading-snug">
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

export function FeaturedProducts({ tenant }: { tenant: string }) {
  const [activeTab, setActiveTab] = useState("best");
  const activeProducts = tabs.find((t) => t.id === activeTab)?.products ?? [];

  return (
    <section id="products" className="py-8 bg-[#F5F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Para Ti Hoy</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-full transition-all",
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} tenant={tenant} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={tenantHref(tenant, "/catalog")}
            className="inline-block px-8 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors bg-white"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
