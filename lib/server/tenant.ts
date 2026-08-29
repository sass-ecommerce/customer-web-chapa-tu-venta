import { headers } from "next/headers";

// El proxy ya resuelve el tenantId por subdominio y lo deja en el header
// x-tenant-id. Si no está presente (dev con rewrite deshabilitado, o el
// proxy no pudo resolverlo), se cae al resolve directo como fallback.
export async function getTenantId(tenant: string): Promise<string> {
  const fromHeader = (await headers()).get("x-tenant-id");
  console.log("getTenantId tenant - Header x-tenant-id:", fromHeader);
  if (fromHeader) return fromHeader;
  throw new Error(`Failed to resolve tenantId for tenant: ${tenant}`);
}
