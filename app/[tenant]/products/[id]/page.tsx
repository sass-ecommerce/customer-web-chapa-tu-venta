import type { Metadata } from "next";
import { getTenantConfig, getTenantId } from "@/lib/config/tenants";
import { ProductDetail } from "@/components/product/product-detail";
import type { ApiProduct } from "@/lib/api/products";

async function fetchProductName(tenant: string, productId: string): Promise<string | null> {
  try {
    const tenantId = getTenantId(tenant);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/products?tenantId=${tenantId}`);
    if (!res.ok) return null;
    const products: ApiProduct[] = await res.json();
    return products.find((p) => p.productId === productId)?.name ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}): Promise<Metadata> {
  const { tenant, id } = await params;
  const config = getTenantConfig(tenant);
  const storeName = config ? config.name : "Chapa Tu Venta";
  const productName = await fetchProductName(tenant, id);
  return {
    title: productName ? `${productName} | ${storeName}` : `Producto | ${storeName}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant, id } = await params;

  return (
    <main className="pt-[100px]">
      <ProductDetail tenant={tenant} productId={id} />
    </main>
  );
}
