import { NextRequest, NextResponse } from "next/server";
import { resolveTenantId } from "@/lib/api/tenants";
import { getProductsPage, type ProductsPage } from "@/lib/api/products";

const CATALOG_PAGE_LIMIT = 9;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tenant = searchParams.get("tenant");
  if (!tenant) {
    return NextResponse.json({ error: "Missing tenant" }, { status: 400 });
  }

  const nextToken = searchParams.get("nextToken") ?? undefined;
  const limit = Number(searchParams.get("limit")) || CATALOG_PAGE_LIMIT;

  try {
    const tenantId = await resolveTenantId(tenant);
    const page: ProductsPage = await getProductsPage(tenantId, {
      limit,
      nextToken,
    });
    return NextResponse.json(page);
  } catch {
    console.error(`Failed to fetch products for tenant: ${tenant}`);
    return NextResponse.json({ products: [] } satisfies ProductsPage);
  }
}
