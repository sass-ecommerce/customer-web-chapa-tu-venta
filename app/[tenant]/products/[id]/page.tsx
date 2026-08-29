import type { Metadata } from "next";
import { getTenantConfig } from "@/lib/config/tenants";
import { ProductDetail } from "@/components/product/product-detail";
import { getTenantProducts } from "@/lib/server/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}): Promise<Metadata> {
  const { tenant, id } = await params;
  const config = getTenantConfig(tenant);
  const storeName = config ? config.name : "Chapa Tu Venta";
  const products = await getTenantProducts(tenant);
  const productName = products.find((p) => p.id === id)?.name ?? null;
  return {
    title: productName
      ? `${productName} | ${storeName}`
      : `Producto | ${storeName}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant, id } = await params;
  const products = await getTenantProducts(tenant);

  return (
    <main className="pt-[100px]">
      <ProductDetail tenant={tenant} productId={id} products={products} />
    </main>
  );
}
