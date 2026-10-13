import { getTenantConfig } from "@/lib/config/tenants";
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

export async function getTenantId(tenant: string): Promise<string> {
  const fromHeader = (await headers()).get("x-tenant-id");
  console.log("getTenantId tenant - Header x-tenant-id:", fromHeader);
  if (fromHeader) return fromHeader;
  throw new Error(`Failed to resolve tenantId for tenant: ${tenant}`);
}

export type TenantByDomainBrandingResponse = {
  code: number;
  message: string;
  data: {
    tenantId: string;
    name?: string | null;
    logoUrl?: string | null;
  };
};

export type TenantBranding = {
  name?: string;
  // URL de imagen (subida desde la app) o emoji del TenantConfig estático.
  logoUrl?: string;
  logoEmoji?: string;
  primaryColor?: string;
};

// Marca del tenant para metadata y previews: lo que el dueño configuró en la
// app (by-domain) tiene prioridad; TenantConfig queda como respaldo.
export async function getTenantBranding(
  tenant: string,
): Promise<TenantBranding> {
  const config = getTenantConfig(tenant);
  let remote: TenantByDomainBrandingResponse["data"] | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STORAGE_API_URL;
    const res = await fetch(
      `${baseUrl}/api/tenants/by-domain?domain=${encodeURIComponent(tenant)}`,
      { next: { revalidate: 300 } },
    );
    if (res.ok)
      remote = ((await res.json()) as TenantByDomainBrandingResponse).data;
  } catch {
    console.warn(`Failed to fetch branding for tenant: ${tenant}`);
  }

  return {
    name: remote?.name || config?.name,
    logoUrl: remote?.logoUrl || undefined,
    logoEmoji: config?.logo,
    primaryColor: config?.primaryColor,
  };
}
