import type { Metadata } from "next";
// import { Hero } from "@/components/home/hero";
import { PromoBanner } from "@/components/home/promo-banner";
import { UspBar } from "@/components/home/usp-bar";
import { FeaturedProducts } from "@/components/home/featured-products";
import { OffersSection } from "@/components/home/offers-section";
import { LatestArrivals } from "@/components/home/latest-arrivals";
import {
  getTenantConfig,
  getTenantBenefits,
  DEFAULT_BENEFITS,
} from "@/lib/config/tenants";
import { getTenantProducts } from "@/lib/server/products";

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
  const benefits = config ? getTenantBenefits(config) : DEFAULT_BENEFITS;
  const products = await getTenantProducts(tenant);

  return (
    <>
      <main className="pt-[100px]">
        {/* <Hero tenant={tenant} hero={config?.hero} /> */}
        {config?.promoBanner && (
          <PromoBanner banner={config.promoBanner} tenant={tenant} />
        )}
        <UspBar benefits={benefits} />
        <FeaturedProducts tenant={tenant} products={products} />
        <OffersSection tenant={tenant} products={products} />
        <LatestArrivals tenant={tenant} products={products} />
      </main>
    </>
  );
}
