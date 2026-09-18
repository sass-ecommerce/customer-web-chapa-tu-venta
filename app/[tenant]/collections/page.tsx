import type { Metadata } from "next";
import Link from "next/link";
import { tenantHref } from "@/lib/utils/tenant-href";
import { getTenantConfig } from "@/lib/config/tenants";
import { getTenantCollections } from "@/lib/api/collections";
import { CollectionCard } from "@/components/collections/collection-card";

const COLLECTIONS_PAGE_LIMIT = 40;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}): Promise<Metadata> {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);
  const storeName = config ? config.name : "Chapa Tu Venta";
  return {
    title: `Colecciones | ${storeName}`,
    description:
      "Explora nuestros productos organizados por tema, temporada u ocasión.",
  };
}

export default async function TenantCollectionsPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const { collections } = await getTenantCollections(tenant, {
    limit: COLLECTIONS_PAGE_LIMIT,
  });

  return (
    <main className="min-h-screen bg-white pt-[100px]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-400">
          <Link
            href={tenantHref(tenant, "/")}
            className="hover:text-brand-accent transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">Colecciones</span>
        </nav>

        <h1 className="font-body text-brand-dark text-3xl font-black sm:text-4xl">
          Colecciones
        </h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Explora nuestros productos organizados por tema, temporada u
          ocasión.
        </p>

        {collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h3 className="font-display text-brand-dark mb-2 text-xl font-semibold">
              Aún no hay colecciones
            </h3>
            <p className="max-w-xs text-sm text-gray-500">
              Vuelve pronto — estamos preparando nuevas formas de explorar el
              catálogo.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                tenant={tenant}
                className="h-[260px] sm:h-[300px]"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
