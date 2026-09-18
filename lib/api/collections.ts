import { getTenantId } from "@/lib/api/tenants";
import { getProductsByIds, type ProductsPage } from "@/lib/api/products";
import {
  toDisplayCollections,
  type DisplayCollection,
} from "@/lib/adapters/collection-adapter";

export type ApiCollection = {
  collectionId: string;
  tenantId: string;
  name: string;
  coverImageKey?: string;
  // The list endpoint (`/collections`) replaces `productIds` with a
  // precomputed `productCount` on every item; a single-collection fetch
  // (`/collections/{id}`) returns the raw `productIds` instead (no count).
  productCount?: number;
  productIds?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ApiCollectionsResponse = {
  code: number;
  message: string;
  data: {
    items: ApiCollection[];
    nextToken?: string | null;
  };
};

export type ApiCollectionResponse = {
  code: number;
  message: string;
  data: ApiCollection;
};

const DEFAULT_COLLECTIONS_LIMIT = 20;
const DEFAULT_COLLECTION_PRODUCTS_LIMIT = 20;

export type FetchCollectionsOptions = {
  limit?: number;
  nextToken?: string;
};

export async function fetchCollections(
  tenantId: string,
  { limit = DEFAULT_COLLECTIONS_LIMIT, nextToken }: FetchCollectionsOptions = {},
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_COLLECTIONS_API_URL;
  const params = new URLSearchParams({ tenantId, limit: String(limit) });
  if (nextToken) params.set("nextToken", nextToken);
  return fetch(`${baseUrl}/collections?${params.toString()}`, {
    next: { revalidate: 20 },
  });
}

export type CollectionsPage = {
  collections: DisplayCollection[];
  nextToken?: string;
};

export async function getCollectionsPage(
  tenantId: string,
  options?: FetchCollectionsOptions,
): Promise<CollectionsPage> {
  const res = await fetchCollections(tenantId, options);
  if (!res.ok) return { collections: [] };
  const { data }: ApiCollectionsResponse = await res.json();
  return {
    collections: await toDisplayCollections(data.items),
    nextToken: data.nextToken ?? undefined,
  };
}

export async function getTenantCollections(
  tenant: string,
  options?: FetchCollectionsOptions,
): Promise<CollectionsPage> {
  try {
    const tenantId = await getTenantId(tenant);
    return await getCollectionsPage(tenantId, options);
  } catch {
    console.error(`Failed to fetch collections for tenant: ${tenant}`);
    return { collections: [] };
  }
}

export async function fetchCollectionById(
  tenantId: string,
  collectionId: string,
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_COLLECTIONS_API_URL;
  const params = new URLSearchParams({ tenantId });
  return fetch(
    `${baseUrl}/collections/${collectionId}?${params.toString()}`,
    { next: { revalidate: 20 } },
  );
}

async function fetchRawCollection(
  tenantId: string,
  collectionId: string,
): Promise<ApiCollection | null> {
  const res = await fetchCollectionById(tenantId, collectionId);
  if (!res.ok) return null;
  const { data }: ApiCollectionResponse = await res.json();
  return data;
}

export async function getCollection(
  tenantId: string,
  collectionId: string,
): Promise<DisplayCollection | null> {
  const raw = await fetchRawCollection(tenantId, collectionId);
  if (!raw) return null;
  const [collection] = await toDisplayCollections([raw]);
  return collection ?? null;
}

export async function getTenantCollection(
  tenant: string,
  collectionId: string,
): Promise<DisplayCollection | null> {
  try {
    const tenantId = await getTenantId(tenant);
    return await getCollection(tenantId, collectionId);
  } catch {
    console.error(
      `Failed to fetch collection ${collectionId} for tenant: ${tenant}`,
    );
    return null;
  }
}

export type FetchCollectionProductsOptions = {
  limit?: number;
  nextToken?: string;
};

// There is no "products in a collection" backend endpoint anymore — a
// collection only exposes its raw `productIds`. Pagination is therefore done
// here: slice the id array and resolve each page's ids via getProductsByIds.
// nextToken is just the next offset, opaque to callers.
export async function getCollectionProductsPage(
  tenantId: string,
  collectionId: string,
  {
    limit = DEFAULT_COLLECTION_PRODUCTS_LIMIT,
    nextToken,
  }: FetchCollectionProductsOptions = {},
): Promise<ProductsPage> {
  const raw = await fetchRawCollection(tenantId, collectionId);
  if (!raw) return { products: [] };

  const productIds = raw.productIds ?? [];
  const offset = nextToken ? Number(nextToken) : 0;
  const pageIds = productIds.slice(offset, offset + limit);
  const products = await getProductsByIds(tenantId, pageIds);

  const nextOffset = offset + limit;
  return {
    products,
    nextToken: nextOffset < productIds.length ? String(nextOffset) : undefined,
  };
}

export async function getTenantCollectionProducts(
  tenant: string,
  collectionId: string,
  options?: FetchCollectionProductsOptions,
): Promise<ProductsPage> {
  try {
    const tenantId = await getTenantId(tenant);
    return await getCollectionProductsPage(tenantId, collectionId, options);
  } catch {
    console.error(
      `Failed to fetch products for collection ${collectionId}, tenant: ${tenant}`,
    );
    return { products: [] };
  }
}
