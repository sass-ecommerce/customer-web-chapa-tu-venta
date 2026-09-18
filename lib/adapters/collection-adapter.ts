import type { ApiCollection } from "@/lib/api/collections";
import { resolveImageUrl } from "@/lib/api/storage";

export type DisplayCollection = {
  id: string;
  name: string;
  coverImageUrl?: string;
  productCount?: number;
  productIds?: string[];
  createdAt?: string;
};

export async function toDisplayCollections(
  collections: ApiCollection[],
): Promise<DisplayCollection[]> {
  return Promise.all(
    collections.map(async (collection) => ({
      id: collection.collectionId,
      name: collection.name,
      coverImageUrl: await resolveImageUrl(collection.coverImageKey),
      // List items carry productCount directly; a single-collection fetch
      // carries productIds instead, so derive the count from its length.
      productCount: collection.productCount ?? collection.productIds?.length,
      productIds: collection.productIds,
      createdAt: collection.createdAt,
    })),
  );
}
