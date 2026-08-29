import { headers } from "next/headers";

export type TenantByDomainResponse = {
  code: number;
  message: string;
  data: {
    tenantId: string;
  };
};

export async function resolveTenantId(domain: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_API_URL;
  const res = await fetch(`${baseUrl}/api/tenants/by-domain?domain=${domain}`);

  if (!res.ok) {
    throw new Error(`Failed to resolve tenant: ${res.status}`);
  }

  const json: TenantByDomainResponse = await res.json();
  return json.data.tenantId;
}

// El proxy ya resuelve el tenantId por subdominio y lo deja en el header
// x-tenant-id. Si no está presente (dev con rewrite deshabilitado, o el
// proxy no pudo resolverlo), se cae al resolve directo como fallback.
export async function getTenantId(tenant: string): Promise<string> {
  const fromHeader = (await headers()).get("x-tenant-id");
  console.log("getTenantId tenant - Header x-tenant-id:", fromHeader);
  if (fromHeader) return fromHeader;
  throw new Error(`Failed to resolve tenantId for tenant: ${tenant}`);
}
