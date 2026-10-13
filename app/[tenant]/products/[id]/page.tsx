import type { Metadata } from "next";
import { getTenantConfig } from "@/lib/config/tenants";
import { ProductDetail } from "@/components/product/product-detail";
import { getTenantProducts, getTenantRawProduct } from "@/lib/api/products";
import { tenantPublicUrl } from "@/lib/utils/public-url";
import { formatPrice } from "@/lib/og/assets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}): Promise<Metadata> {
  const { tenant, id } = await params;
  const storeName = getTenantConfig(tenant)?.name;
  const product = await getTenantRawProduct(tenant, id);
  if (!product) return { title: storeName ?? "Producto" };

  const title = storeName ? `${product.name} | ${storeName}` : product.name;
  const description = [
    formatPrice(product.basePrice),
    product.category?.[0]?.name,
    storeName,
  ]
    .filter(Boolean)
    .join(" · ");
  const url = await tenantPublicUrl(tenant, `/products/${id}`);
  const image = {
    url: await tenantPublicUrl(tenant, `/products/${id}/og-image`),
    width: 1200,
    height: 630,
    alt: product.name,
  };
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  return {
    title,
    description,
    alternates: { canonical: url },
    facebook: facebookAppId ? { appId: facebookAppId } : undefined,
    openGraph: {
      // og:site_name ya lleva la tienda; el título queda solo con el producto.
      title: product.name,
      description,
      url,
      siteName: storeName,
      locale: "es_PE",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant, id } = await params;
  const { products } = await getTenantProducts(tenant);

  return (
    <main className="pt-[100px]">
      <ProductDetail tenant={tenant} productId={id} products={products} />
    </main>
  );
}
