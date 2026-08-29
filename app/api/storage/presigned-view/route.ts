import { NextRequest, NextResponse } from "next/server";
import { fetchPresignedViewUrlUpstream } from "@/lib/api/storage";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ message: "key is required" }, { status: 400 });
  }

  const res = await fetchPresignedViewUrlUpstream(key);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch presigned view URL" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
