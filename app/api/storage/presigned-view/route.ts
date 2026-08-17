import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ message: "key is required" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_API_URL;
  const res = await fetch(
    `${baseUrl}/api/storage/presigned-view?key=${encodeURIComponent(key)}`,
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch presigned view URL" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
