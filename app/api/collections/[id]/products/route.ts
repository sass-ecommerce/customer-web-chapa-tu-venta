import { NextRequest, NextResponse } from "next/server";
import { resolveTenantId } from "@/lib/api/tenants";
import { getCollectionProductsPage } from "@/lib/api/collections";
import type { ProductsPage } from "@/lib/api/products";

const COLLECTION_PRODUCTS_PAGE_LIMIT = 12;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = req.nextUrl;
  const tenant = searchParams.get("tenant");
  if (!tenant) {
    return NextResponse.json({ error: "Missing tenant" }, { status: 400 });
  }

  const nextToken = searchParams.get("nextToken") ?? undefined;
  const limit =
    Number(searchParams.get("limit")) || COLLECTION_PRODUCTS_PAGE_LIMIT;

  try {
    const tenantId = await resolveTenantId(tenant);
    const page: ProductsPage = await getCollectionProductsPage(
      tenantId,
      id,
      { limit, nextToken },
    );
    return NextResponse.json(page);
  } catch {
    console.error(
      `Failed to fetch products for collection ${id}, tenant: ${tenant}`,
    );
    return NextResponse.json({ products: [] } satisfies ProductsPage);
  }
}
