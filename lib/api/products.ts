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

// Routed through /api/products (same-origin) because the upstream API
// doesn't send CORS headers and rejects direct browser requests.
export async function fetchProducts(tenantId: string): Promise<ApiProduct[]> {
  const res = await fetch(`/api/products?tenantId=${tenantId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}
