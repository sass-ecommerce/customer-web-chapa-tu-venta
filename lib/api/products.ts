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

export type ApiProduct = {
  productId: string;
  tenantId: string;
  categoryId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
  images: ApiProductImage[];
  category?: ApiProductCategory[];
  createdAt?: string;
  updatedAt?: string;
};

export async function fetchProducts(tenantId: string): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(`${baseUrl}/products?tenantId=${tenantId}`);
}

export async function getTenantProducts(
  tenant: string,
): Promise<DisplayProduct[]> {
  try {
    const tenantId = await getTenantId(tenant);
    const res = await fetchProducts(tenantId);
    if (!res.ok) return [];
    const products: ApiProduct[] = await res.json();
    return await toDisplayProducts(products);
  } catch {
    console.error(`Failed to fetch products for tenant: ${tenant}`);
    return [];
  }
}
