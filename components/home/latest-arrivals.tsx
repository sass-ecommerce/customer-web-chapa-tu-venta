import Link from "next/link";
import { tenantHref } from "@/lib/tenant-href";
import { getLatestProducts } from "@/lib/mock-products";

const latestProducts = getLatestProducts(6);

export function LatestArrivals({ tenant }: { tenant: string }) {
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
            {latestProducts.map((product) => (
              <Link
                key={product.id}
                href={tenantHref(tenant, `/products/${product.id}`)}
                className="group flex flex-col gap-2"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
