import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.DISABLE_SUBDOMAIN_REWRITE === "true") return NextResponse.next();

  const host = req.headers.get("host") ?? "";
  const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? "localhost:3000";

  // Trata el dominio raíz y www como landing page
  const isRootDomain = host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`;
  if (!host.endsWith(ROOT_DOMAIN) || isRootDomain) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  const tenant = host.replace(`.${ROOT_DOMAIN}`, "");
  const url = req.nextUrl.clone();
  url.pathname = `/${tenant}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
