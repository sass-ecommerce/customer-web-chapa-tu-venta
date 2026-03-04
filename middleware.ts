import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? "localhost:3000";

  // Solo actúa si hay subdominio (producción)
  if (!host.endsWith(ROOT_DOMAIN) || host === ROOT_DOMAIN) {
    return NextResponse.next();
  }

  const tenant = host.replace(`.${ROOT_DOMAIN}`, "");
  const url = req.nextUrl.clone();
  url.pathname = `/${tenant}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
