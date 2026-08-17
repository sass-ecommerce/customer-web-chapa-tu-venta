import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tenantId = request.nextUrl.searchParams.get("tenantId");

  if (!tenantId) {
    return NextResponse.json(
      { message: "tenantId is required" },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/products?tenantId=${tenantId}`);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
