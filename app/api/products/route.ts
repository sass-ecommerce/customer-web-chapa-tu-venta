import { NextRequest, NextResponse } from "next/server";
import { fetchProductsUpstream } from "@/lib/api/products";

export async function GET(request: NextRequest) {
  const tenantId = request.nextUrl.searchParams.get("tenantId");

  if (!tenantId) {
    return NextResponse.json(
      { message: "tenantId is required" },
      { status: 400 },
    );
  }

  const res = await fetchProductsUpstream(tenantId);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
