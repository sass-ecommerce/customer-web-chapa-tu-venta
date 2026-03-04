export type TenantConfig = {
  name: string;
  slug: string;
  logo: string;
  primaryColor?: string;
};

export const TENANTS: Record<string, TenantConfig> = {
  demo: { name: "Demo Store", slug: "demo", logo: "🛍️" },
  beibeli: { name: "BeliBeli", slug: "beibeli", logo: "🎁" },
};

export function getTenantConfig(slug: string): TenantConfig | null {
  return TENANTS[slug] ?? null;
}
