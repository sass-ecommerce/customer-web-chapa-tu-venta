import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { BenefitsBar } from "@/components/home/benefits-bar";
import { FeaturedProducts } from "@/components/home/featured-products";
import { OffersSection } from "@/components/home/offers-section";
import { getTenantConfig } from "@/lib/tenants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}): Promise<Metadata> {
  const { tenant } = await params;
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
  await params;
  return (
    <main>
      <Hero />
      <BenefitsBar />
      <FeaturedProducts />
      <OffersSection />
    </main>
  );
}
