import { getTenantId } from "@/lib/api/tenants";
import {
  toDisplayProducts,
  type DisplayProduct,
} from "@/lib/adapters/product-adapter";

export type ApiProductImage = {
  id: string;
  s3Key: string;
  isPrimary: boolean;
  sortOrder: number;
};

export type ApiProductCategory = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
};

export type ApiProductAttribute = {
  attributeKey: string;
  attributeLabel: string;
  value: string;
};

export type ApiProduct = {
  productId: string;
  tenantId: string;
  categoryId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
  images: ApiProductImage[];
  attributes?: ApiProductAttribute[];
  category?: ApiProductCategory[];
  createdAt?: string;
  updatedAt?: string;
};

export type ApiProductsResponse = {
  code: number;
  message: string;
  data: {
    items: ApiProduct[];
    nextToken?: string;
  };
};

const DEFAULT_PRODUCTS_LIMIT = 20;

export type FetchProductsOptions = {
  limit?: number;
  nextToken?: string;
};

export async function fetchProducts(
  tenantId: string,
  { limit = DEFAULT_PRODUCTS_LIMIT, nextToken }: FetchProductsOptions = {},
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams({ tenantId, limit: String(limit) });
  // nextToken is only sent when paging past the first batch of products.
  if (nextToken) params.set("nextToken", nextToken);
  return fetch(`${baseUrl}/products?${params.toString()}`, {
    next: { revalidate: 20 },
  });
}

export type ProductsPage = {
  products: DisplayProduct[];
  nextToken?: string;
};

export async function getProductsPage(
  tenantId: string,
  options?: FetchProductsOptions,
): Promise<ProductsPage> {
  const res = await fetchProducts(tenantId, options);
  if (!res.ok) return { products: [] };
  const { data }: ApiProductsResponse = await res.json();
  return {
    products: await toDisplayProducts(data.items),
    nextToken: data.nextToken,
  };
}

export async function getTenantProducts(
  tenant: string,
  options?: FetchProductsOptions,
): Promise<ProductsPage> {
  try {
    const tenantId = await getTenantId(tenant);
    return await getProductsPage(tenantId, options);
  } catch {
    console.error(`Failed to fetch products for tenant: ${tenant}`);
    return { products: [] };
  }
}
