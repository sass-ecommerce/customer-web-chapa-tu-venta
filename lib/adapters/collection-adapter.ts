import type { ApiCollection } from "@/lib/api/collections";

export type DisplayCollection = {
  id: string;
  name: string;
  coverImageUrl?: string;
  productCount?: number;
  productIds?: string[];
  createdAt?: string;
};

export function toDisplayCollections(
  collections: ApiCollection[],
): DisplayCollection[] {
  return collections.map((collection) => ({
    id: collection.collectionId,
    name: collection.name,
    coverImageUrl: collection.coverImageUrl ?? undefined,
    // List items carry productCount directly; a single-collection fetch
    // carries productIds instead, so derive the count from its length.
    productCount: collection.productCount ?? collection.productIds?.length,
    productIds: collection.productIds,
    createdAt: collection.createdAt,
  }));
}
