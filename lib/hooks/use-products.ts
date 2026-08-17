"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api/products";
import { getTenantId } from "@/lib/config/tenants";
import { toDisplayProducts } from "@/lib/adapters/product-adapter";

export function useProducts(tenant: string) {
  const tenantId = getTenantId(tenant);

  return useQuery({
    queryKey: ["products", tenantId],
    queryFn: () => fetchProducts(tenantId),
    select: toDisplayProducts,
  });
}
