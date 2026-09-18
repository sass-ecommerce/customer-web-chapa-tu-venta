import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { tenantHref } from "@/lib/utils/tenant-href";
import type { DisplayCollection } from "@/lib/adapters/collection-adapter";
import { ProductImagePlaceholder } from "@/components/home/product-image-placeholder";

export function CollectionCard({
  collection,
  tenant,
  className,
}: {
  collection: DisplayCollection;
  tenant: string;
  className?: string;
}) {
  // productCount is set from either the list endpoint's precomputed count or
  // a single-collection fetch's productIds length; keep the guard in case a
  // caller ever passes a collection built without either.
  const knowsCount = collection.productCount !== undefined;
  const isEmpty = collection.productCount === 0;

  return (
    <Link
      href={tenantHref(tenant, `/collections/${collection.id}`)}
      className={cn(
        "group relative block overflow-hidden rounded-2xl",
        className,
      )}
    >
      {collection.coverImageUrl ? (
        <img
          src={collection.coverImageUrl}
          alt={collection.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <ProductImagePlaceholder className="h-full w-full" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2">
        <span className="font-display text-lg font-bold text-white drop-shadow-sm">
          {collection.name}
        </span>
        {knowsCount && (
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold text-white",
              isEmpty
                ? "bg-brand-accent border-transparent"
                : "border-white/35 bg-white/15",
            )}
          >
            {isEmpty
              ? "Próximamente"
              : `${collection.productCount} producto${collection.productCount === 1 ? "" : "s"}`}
          </span>
        )}
      </div>
    </Link>
  );
}
