"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/utils";
import { CATEGORIES, TAGS } from "@/lib/mocks/mock-products";
import type { FilterState } from "./catalog-view";

type FilterSidebarProps = {
  filters: FilterState;
  onCategoryChange: (cat: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  onTagChange: (tag: string) => void;
  onClearAll: () => void;
};

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="text-brand-dark hover:text-brand-accent flex w-full items-center justify-between py-3 text-sm font-semibold transition-colors"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-gray-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && <div className="space-y-2 pb-4">{children}</div>}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn(
            "text-xs",
            star <= rating ? "text-yellow-400" : "text-gray-300",
          )}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function FilterSidebar({
  filters,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onTagChange,
  onClearAll,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 1000 ||
    filters.minRating > 0 ||
    filters.tags.length > 0;

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-brand-accent hover:text-brand-accent-hover text-xs font-medium transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      <div className="space-y-1">
        {/* Categoría */}
        <AccordionSection title="Categoría">
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const active = filters.categories.includes(cat);
              return (
                <label
                  key={cat}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border transition-all",
                      active
                        ? "bg-brand-accent border-brand-accent"
                        : "group-hover:border-brand-accent border-gray-300",
                    )}
                    onClick={() => onCategoryChange(cat)}
                  >
                    {active && (
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={active}
                    onChange={() => onCategoryChange(cat)}
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      active
                        ? "text-brand-dark font-medium"
                        : "group-hover:text-brand-dark text-gray-600",
                    )}
                    onClick={() => onCategoryChange(cat)}
                  >
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </AccordionSection>

        <Separator />

        {/* Precio */}
        <AccordionSection title="Precio">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-gray-400">
                $
              </span>
              <Input
                type="number"
                min={0}
                max={filters.priceMax}
                value={filters.priceMin || ""}
                placeholder="0"
                onChange={(e) =>
                  onPriceChange(Number(e.target.value) || 0, filters.priceMax)
                }
                className="pl-5 text-sm"
              />
            </div>
            <span className="shrink-0 text-sm text-gray-400">–</span>
            <div className="relative flex-1">
              <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-gray-400">
                $
              </span>
              <Input
                type="number"
                min={filters.priceMin}
                max={9999}
                value={filters.priceMax === 1000 ? "" : filters.priceMax}
                placeholder="1000"
                onChange={(e) =>
                  onPriceChange(
                    filters.priceMin,
                    Number(e.target.value) || 1000,
                  )
                }
                className="pl-5 text-sm"
              />
            </div>
          </div>
        </AccordionSection>

        <Separator />

        {/* Valoración */}
        <AccordionSection title="Valoración">
          <div className="space-y-2">
            {[
              { value: 0, label: "Todas" },
              { value: 4, label: "4★ o más" },
              { value: 3, label: "3★ o más" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="group flex cursor-pointer items-center gap-2.5"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all",
                    filters.minRating === value
                      ? "border-brand-accent"
                      : "group-hover:border-brand-accent border-gray-300",
                  )}
                  onClick={() => onRatingChange(value)}
                >
                  {filters.minRating === value && (
                    <div className="bg-brand-accent h-2 w-2 rounded-full" />
                  )}
                </div>
                <input
                  type="radio"
                  className="sr-only"
                  checked={filters.minRating === value}
                  onChange={() => onRatingChange(value)}
                />
                <div
                  className="flex items-center gap-1.5"
                  onClick={() => onRatingChange(value)}
                >
                  {value > 0 ? (
                    <StarRating rating={value} />
                  ) : (
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        filters.minRating === value
                          ? "text-brand-dark font-medium"
                          : "group-hover:text-brand-dark text-gray-600",
                      )}
                    >
                      {label}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </AccordionSection>

        <Separator />

        {/* Etiquetas */}
        <AccordionSection title="Etiquetas">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => {
              const active = filters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onTagChange(tag)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-bold transition-all",
                    tag === "NUEVO" &&
                      (active
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-green-300 text-green-600 hover:bg-green-50"),
                    tag === "OFERTA" &&
                      (active
                        ? "bg-brand-accent border-brand-accent text-white"
                        : "text-brand-accent border-orange-300 hover:bg-orange-50"),
                    tag === "TOP" &&
                      (active
                        ? "bg-brand-dark border-brand-dark text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"),
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}

// Mobile drawer version
export function FilterDrawer({
  filters,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onTagChange,
  onClearAll,
  onClose,
  onApply,
}: FilterSidebarProps & { onClose: () => void; onApply: () => void }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-40 bg-black/50 duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="animate-in slide-in-from-left fixed top-0 bottom-0 left-0 z-50 flex w-80 max-w-[90vw] flex-col bg-white shadow-2xl duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-brand-dark font-semibold">Filtros</h2>
          <button
            onClick={onClose}
            className="hover:text-brand-dark p-1 text-gray-400 transition-colors"
            aria-label="Cerrar filtros"
          >
            <svg
              className="size-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          <FilterSidebar
            filters={filters}
            onCategoryChange={onCategoryChange}
            onPriceChange={onPriceChange}
            onRatingChange={onRatingChange}
            onTagChange={onTagChange}
            onClearAll={onClearAll}
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onClearAll();
            }}
          >
            Limpiar
          </Button>
          <Button
            onClick={onApply}
            className="bg-brand-accent hover:bg-brand-accent-hover flex-1 border-0 text-white"
          >
            Aplicar →
          </Button>
        </div>
      </div>
    </>
  );
}
