import { getTenantId } from "@/lib/api/tenants";

// Only categories with active products are returned (productCount > 0),
// as a flat list sorted by name; the tree is built from parentId.
export type ApiCategory = {
  categoryId: string;
  parentId: string | null;
  type: "BASE" | "CHILDREN";
  name: string;
  slug: string;
  productCount: number;
};

export type ApiCategoriesResponse = {
  code: number;
  message: string;
  data: {
    items: ApiCategory[];
  };
};

export async function fetchCategories(tenantId: string): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_CATEGORIES_API_URL;
  const params = new URLSearchParams({ tenantId });
  return fetch(`${baseUrl}/categories?${params.toString()}`, {
    next: { revalidate: 300 },
  });
}

export async function getTenantCategories(
  tenant: string,
): Promise<ApiCategory[]> {
  try {
    const tenantId = await getTenantId(tenant);
    const res = await fetchCategories(tenantId);
    if (!res.ok) return [];
    const { data }: ApiCategoriesResponse = await res.json();
    return data.items;
  } catch {
    console.error(`Failed to fetch categories for tenant: ${tenant}`);
    return [];
  }
}
