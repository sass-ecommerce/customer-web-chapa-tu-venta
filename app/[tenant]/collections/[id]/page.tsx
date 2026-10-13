import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTenantConfig } from "@/lib/config/tenants";
import { tenantPublicUrl } from "@/lib/utils/public-url";
import {
  getTenantCollection,
  getTenantCollectionProducts,
} from "@/lib/api/collections";
import { CollectionDetailView } from "@/components/collections/collection-detail-view";

const INITIAL_COLLECTION_PRODUCTS_LIMIT = 12;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}): Promise<Metadata> {
  const { tenant, id } = await params;
  const storeName = getTenantConfig(tenant)?.name;
  const collection = await getTenantCollection(tenant, id);
  if (!collection) return { title: storeName ?? "Colección" };

  const count = collection.productCount;
  const title = storeName
    ? `${collection.name} | ${storeName}`
    : collection.name;
  const description = count
    ? `${count} ${count === 1 ? "producto" : "productos"} en ${collection.name}${storeName ? ` · ${storeName}` : ""}`
    : `Descubre la colección ${collection.name}${storeName ? ` en ${storeName}` : ""}.`;
  const url = await tenantPublicUrl(tenant, `/collections/${id}`);
  const image = {
    url: await tenantPublicUrl(tenant, `/collections/${id}/og-image`),
    width: 1200,
    height: 630,
    alt: collection.name,
  };
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  return {
    title,
    description,
    alternates: { canonical: url },
    facebook: facebookAppId ? { appId: facebookAppId } : undefined,
    openGraph: {
      // og:site_name ya lleva la tienda; el título queda solo con la colección.
      title: collection.name,
      description,
      url,
      siteName: storeName,
      locale: "es_PE",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: collection.name,
      description,
      images: [image],
    },
  };
}

export default async function TenantCollectionDetailPage({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant, id } = await params;
  const collection = await getTenantCollection(tenant, id);

  if (!collection) notFound();

  const { products, nextToken } = await getTenantCollectionProducts(
    tenant,
    id,
    { limit: INITIAL_COLLECTION_PRODUCTS_LIMIT },
  );

  return (
    <main className="min-h-screen bg-white pt-[100px]">
      <CollectionDetailView
        tenant={tenant}
        collection={collection}
        initialProducts={products}
        initialNextToken={nextToken}
      />
    </main>
  );
}
