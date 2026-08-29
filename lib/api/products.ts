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

export async function fetchProductsUpstream(
  tenantId: string,
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(`${baseUrl}/products?tenantId=${tenantId}`);
}
