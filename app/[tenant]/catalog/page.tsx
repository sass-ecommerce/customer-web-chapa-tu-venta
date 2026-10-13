import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getTenantConfig } from "@/lib/config/tenants";
import { getTenantProducts } from "@/lib/api/products";
import { getTenantCategories } from "@/lib/api/categories";

const INITIAL_CATALOG_LIMIT = 9;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}): Promise<Metadata> {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);
  const storeName = config ? config.name : "Chapa Tu Venta";
  return {
    title: `Catálogo | ${storeName}`,
    description:
      "Explora nuestro catálogo completo de productos. Filtra por categoría, precio y valoración.",
  };
}

export default async function TenantCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { tenant } = await params;
  const { q, category } = await searchParams;
  const [{ products, nextToken }, categories] = await Promise.all([
    getTenantProducts(tenant, { limit: INITIAL_CATALOG_LIMIT }),
    getTenantCategories(tenant),
  ]);
  // Ignore an unknown or no-longer-visible category instead of filtering
  // everything out.
  const initialCategoryId = categories.some((c) => c.categoryId === category)
    ? category
    : undefined;

  return (
    <main className="pt-[100px]">
      {/* Keyed by the URL filters so a new header search resets the view. */}
      <CatalogView
        key={`${q ?? ""}|${initialCategoryId ?? ""}`}
        tenant={tenant}
        search={q ?? ""}
        categories={categories}
        initialCategoryId={initialCategoryId}
        initialProducts={products}
        initialNextToken={nextToken}
      />
    </main>
  );
}
