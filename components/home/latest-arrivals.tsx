"use client";

import Link from "next/link";
import { tenantHref } from "@/lib/utils/tenant-href";
import { ProductImage } from "@/components/home/product-image";
import type { DisplayProduct } from "@/lib/adapters/product-adapter";

export function LatestArrivals({
  tenant,
  products,
}: {
  tenant: string;
  products: DisplayProduct[];
}) {
  if (products.length === 0) return null;

  const latestProducts = [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  return (
    <section className="bg-[#F5F6F7] py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-5">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">
                Nuevos Ingresos
              </h2>
              <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                NUEVO
              </span>
            </div>
            <Link
              href={tenantHref(tenant, "/catalog")}
              className="text-brand-accent text-xs font-medium hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {latestProducts.map((product) => (
              <Link
                key={product.id}
                href={tenantHref(tenant, `/products/${product.id}`)}
                className="group flex flex-col gap-2"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <ProductImage
                    imageKey={product.imageKey}
                    alt={product.name}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-[11px] tracking-wide text-gray-400 uppercase">
                    {product.category}
                  </p>
                  <p className="line-clamp-1 text-xs leading-snug font-semibold text-gray-800">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
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
