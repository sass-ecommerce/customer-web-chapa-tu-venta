import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PromoBanner } from "@/components/home/promo-banner";
import { CollectionsSection } from "@/components/home/collections-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { OffersSection } from "@/components/home/offers-section";
import { LatestArrivals } from "@/components/home/latest-arrivals";
import { getTenantConfig } from "@/lib/config/tenants";
import { getTenantProducts } from "@/lib/api/products";
import { getTenantCollections } from "@/lib/api/collections";

const HOME_COLLECTIONS_LIMIT = 8;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}): Promise<Metadata> {
  const { tenant } = await params;
  console.log("generateMetadata tenant:", tenant);
  const config = getTenantConfig(tenant);
  return {
    title: config ? `${config.name} | Chapa Tu Venta` : "Chapa Tu Venta",
  };
}

export default async function TenantHomePage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);
  const { products } = await getTenantProducts(tenant);
  const { collections } = await getTenantCollections(tenant, {
    limit: HOME_COLLECTIONS_LIMIT,
  });

  return (
    <>
      <main>
        <Hero tenant={tenant} hero={config?.hero} />
        {config?.promoBanner && (
          <PromoBanner banner={config.promoBanner} tenant={tenant} />
        )}
        <CollectionsSection tenant={tenant} collections={collections} />
        <FeaturedProducts tenant={tenant} products={products} />
        <OffersSection tenant={tenant} products={products} />
        <LatestArrivals tenant={tenant} products={products} />
      </main>
    </>
  );
}
