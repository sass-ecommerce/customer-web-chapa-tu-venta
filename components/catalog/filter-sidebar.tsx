"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CATEGORIES, TAGS } from "@/lib/mock-products";
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
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-brand-dark hover:text-brand-accent transition-colors"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-gray-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && <div className="pb-4 space-y-2">{children}</div>}
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
            star <= rating ? "text-yellow-400" : "text-gray-300"
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-brand-accent hover:text-brand-accent-hover transition-colors"
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
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                      active
                        ? "bg-brand-accent border-brand-accent"
                        : "border-gray-300 group-hover:border-brand-accent"
                    )}
                    onClick={() => onCategoryChange(cat)}
                  >
                    {active && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
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
                        : "text-gray-600 group-hover:text-brand-dark"
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
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
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
            <span className="text-gray-400 text-sm shrink-0">–</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
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
                    Number(e.target.value) || 1000
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
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                    filters.minRating === value
                      ? "border-brand-accent"
                      : "border-gray-300 group-hover:border-brand-accent"
                  )}
                  onClick={() => onRatingChange(value)}
                >
                  {filters.minRating === value && (
                    <div className="w-2 h-2 rounded-full bg-brand-accent" />
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
                          : "text-gray-600 group-hover:text-brand-dark"
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
                    "px-3 py-1 text-xs font-bold rounded-full border transition-all",
                    tag === "NUEVO" &&
                      (active
                        ? "bg-green-500 text-white border-green-500"
                        : "border-green-300 text-green-600 hover:bg-green-50"),
                    tag === "OFERTA" &&
                      (active
                        ? "bg-brand-accent text-white border-brand-accent"
                        : "border-orange-300 text-brand-accent hover:bg-orange-50"),
                    tag === "TOP" &&
                      (active
                        ? "bg-brand-dark text-white border-brand-dark"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50")
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
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 flex flex-col animate-in slide-in-from-left duration-300 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-brand-dark">Filtros</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-brand-dark transition-colors p-1"
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
        <div className="border-t border-gray-100 px-5 py-4 flex gap-3">
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
            className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-white border-0"
          >
            Aplicar →
          </Button>
        </div>
      </div>
    </>
  );
}
