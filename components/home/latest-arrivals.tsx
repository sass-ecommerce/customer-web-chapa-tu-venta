"use client";

import Link from "next/link";
import { tenantHref } from "@/lib/utils/tenant-href";
import { useProducts } from "@/lib/hooks/use-products";
import { ProductImage } from "@/components/home/product-image";

export function LatestArrivals({ tenant }: { tenant: string }) {
  const { data: products, isLoading } = useProducts(tenant);

  if (!isLoading && (products?.length ?? 0) === 0) return null;

  const latestProducts = [...(products ?? [])]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  return (
    <section className="bg-[#F5F6F7] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">
                Nuevos Ingresos
              </h2>
              <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                NUEVO
              </span>
            </div>
            <Link
              href={tenantHref(tenant, "/catalog")}
              className="text-xs font-medium text-brand-accent hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 animate-pulse">
                    <div className="aspect-square rounded-xl bg-gray-100" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                  </div>
                ))
              : latestProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={tenantHref(tenant, `/products/${product.id}`)}
                    className="group flex flex-col gap-2"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <ProductImage
                        imageKey={product.imageKey}
                        alt={product.name}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        {product.category}
                      </p>
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1 leading-snug">
                        {product.name}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">
                        S/ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
