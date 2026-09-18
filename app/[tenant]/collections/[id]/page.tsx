import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTenantConfig } from "@/lib/config/tenants";
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
  const config = getTenantConfig(tenant);
  const storeName = config ? config.name : "Chapa Tu Venta";
  const collection = await getTenantCollection(tenant, id);

  const title = collection
    ? `${collection.name} | ${storeName}`
    : `Colección | ${storeName}`;
  const description = collection
    ? `Descubre "${collection.name}" en ${storeName}.`
    : `Explora esta colección en ${storeName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: collection?.coverImageUrl
        ? [{ url: collection.coverImageUrl }]
        : undefined,
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
