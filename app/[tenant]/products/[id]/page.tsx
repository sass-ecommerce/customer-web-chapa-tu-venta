import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTenantConfig } from "@/lib/tenants";
import { getProductById } from "@/lib/mock-products";
import { ProductDetail } from "@/components/product/product-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}): Promise<Metadata> {
  const { tenant, id } = await params;
  const config = getTenantConfig(tenant);
  const product = getProductById(Number(id));
  const storeName = config ? config.name : "Chapa Tu Venta";
  return {
    title: product ? `${product.name} | ${storeName}` : "Producto | Chapa Tu Venta",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant, id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="pt-[100px]">
      <ProductDetail product={product} tenant={tenant} />
    </main>
  );
}
