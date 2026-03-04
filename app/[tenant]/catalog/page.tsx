import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getTenantConfig } from "@/lib/tenants";

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
}: {
  params: Promise<{ tenant: string }>;
}) {
  await params;
  return (
    <main className="pt-[100px]">
      <CatalogView />
    </main>
  );
}
