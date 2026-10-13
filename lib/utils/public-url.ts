import { headers } from "next/headers";
import { tenantHref } from "@/lib/utils/tenant-href";

// URL absoluta pública (para og:url / canonical). Usa el host de la request
// para respetar el subdominio del tenant en prod y el path-based en dev.
export async function tenantPublicUrl(
  tenant: string,
  path: string,
): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${proto}://${host}${tenantHref(tenant, path)}`;
}
