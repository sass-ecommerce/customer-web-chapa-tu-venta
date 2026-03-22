export function tenantHref(tenant: string, path: string): string {
  if (process.env.NEXT_PUBLIC_DISABLE_SUBDOMAIN_REWRITE === "true") {
    return `/${tenant}${path}`;
  }
  return path;
}
