"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { tenantHref } from "@/lib/utils/tenant-href";
import type { DisplayCollection } from "@/lib/adapters/collection-adapter";
import type { DisplayProduct } from "@/lib/adapters/product-adapter";
import type { ProductsPage } from "@/lib/api/products";
import { ProductGrid } from "@/components/catalog/product-grid";
import { ProductImagePlaceholder } from "@/components/home/product-image-placeholder";

export function CollectionDetailView({
  tenant,
  collection,
  initialProducts,
  initialNextToken,
}: {
  tenant: string;
  collection: DisplayCollection;
  initialProducts: DisplayProduct[];
  initialNextToken?: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [nextToken, setNextToken] = useState(initialNextToken);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // Always fetched via getTenantCollection (single-collection fetch), which
  // includes productIds, so productCount is a real number here.
  const productCount = collection.productCount ?? 0;

  const handleLoadMore = useCallback(async () => {
    if (!nextToken || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const params = new URLSearchParams({ tenant, nextToken });
      const res = await fetch(
        `/api/collections/${collection.id}/products?${params.toString()}`,
      );
      if (res.ok) {
        const page: ProductsPage = await res.json();
        setProducts((prev) => [...prev, ...page.products]);
        setNextToken(page.nextToken);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [tenant, collection.id, nextToken, isLoadingMore]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-400">
        <Link
          href={tenantHref(tenant, "/collections")}
          className="hover:text-brand-accent transition-colors"
        >
          Colecciones
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-medium">{collection.name}</span>
      </nav>

      <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[340px]">
        {collection.coverImageUrl ? (
          <img
            src={collection.coverImageUrl}
            alt={collection.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProductImagePlaceholder className="h-full w-full" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-6 bottom-6 flex flex-col gap-1 sm:inset-x-10 sm:bottom-8">
          <span className="text-xs font-semibold tracking-wide text-white/80 uppercase">
            Colección
          </span>
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            {collection.name}
          </h1>
          <span className="text-sm text-white/80">
            {productCount === 0
              ? "Próximamente"
              : `${productCount} producto${productCount === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>

      <div className="mt-8">
        {productCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h3 className="font-display text-brand-dark mb-2 text-xl font-semibold">
              Esta colección no tiene productos todavía
            </h3>
            <p className="max-w-xs text-sm text-gray-500">
              Vuelve pronto — estamos agregando productos a esta colección.
            </p>
          </div>
        ) : (
          <ProductGrid
            products={products}
            viewMode="grid"
            tenant={tenant}
            hasMore={Boolean(nextToken)}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            onClearFilters={() => {}}
          />
        )}
      </div>
    </div>
  );
}
