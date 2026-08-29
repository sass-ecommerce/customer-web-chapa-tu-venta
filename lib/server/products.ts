import { fetchProductsUpstream, type ApiProduct } from "@/lib/api/products";
import { getTenantId } from "@/lib/server/tenant";
import {
  toDisplayProducts,
  type DisplayProduct,
} from "@/lib/adapters/product-adapter";

export async function getTenantProducts(
  tenant: string,
): Promise<DisplayProduct[]> {
  try {
    const tenantId = await getTenantId(tenant);
    const res = await fetchProductsUpstream(tenantId);
    if (!res.ok) return [];
    const products: ApiProduct[] = await res.json();
    return toDisplayProducts(products);
  } catch {
    console.error(`Failed to fetch products for tenant: ${tenant}`);
    return [];
  }
}
