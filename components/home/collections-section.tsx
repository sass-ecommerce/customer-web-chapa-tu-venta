"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tenantHref } from "@/lib/utils/tenant-href";
import type { DisplayCollection } from "@/lib/adapters/collection-adapter";
import { CollectionCard } from "@/components/collections/collection-card";

const SCROLL_AMOUNT = 300;

export function CollectionsSection({
  tenant,
  collections,
}: {
  tenant: string;
  collections: DisplayCollection[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (collections.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <section id="collections" className="bg-[#F5F6F7] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900">
              Colecciones
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Compra por tema, no producto por producto.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={tenantHref(tenant, "/collections")}
              className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 sm:inline"
            >
              Ver todas
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50"
                aria-label="Anterior"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50"
                aria-label="Siguiente"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              tenant={tenant}
              className="h-[340px] w-[240px] shrink-0 snap-start sm:h-[380px] sm:w-[284px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
