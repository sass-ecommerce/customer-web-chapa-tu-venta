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
  return {
    title: collection
      ? `${collection.name} | ${storeName}`
      : `Colección | ${storeName}`,
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
