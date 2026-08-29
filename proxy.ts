import { NextRequest, NextResponse } from "next/server";
import { resolveTenantId } from "@/lib/api/tenants";

async function withTenantHeader(
  req: NextRequest,
  tenant: string,
): Promise<Headers> {
  const requestHeaders = new Headers(req.headers);

  try {
    const tenantId = await resolveTenantId(tenant);
    requestHeaders.set("x-tenant-id", tenantId);
  } catch {
    // Sin header: el layout hace el fallback (resuelve de nuevo o 404).
    console.warn(`Failed to resolve tenantId for tenant: ${tenant}`);
  }
  return requestHeaders;
}

// Dev: sin rewrite de subdominio, el tenant ya viene en el path (/demo/...).
async function proxyLocal(req: NextRequest) {
  const tenant = req.nextUrl.pathname.split("/")[1] || null;
  const requestHeaders = await withTenantHeader(req, tenant!);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Prod: el tenant es el subdominio, hay que reescribir el path.
async function proxyProd(req: NextRequest) {
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

  const requestHeaders = await withTenantHeader(req, tenant);
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export async function proxy(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_DISABLE_SUBDOMAIN_REWRITE === "true")
    return proxyLocal(req);

  return proxyProd(req);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
