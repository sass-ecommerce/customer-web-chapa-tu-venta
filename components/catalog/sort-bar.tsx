"use client";

import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils/utils";
import type { FilterState } from "./catalog-view";
import type { SortOption } from "@/lib/mocks/mock-products";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "newest", label: "Más nuevo" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorado" },
];

type SortBarProps = {
  count: number;
  totalCount: number;
  filters: FilterState;
  onRemoveCategory: (cat: string) => void;
  onRemoveTag: (tag: string) => void;
  onRemoveRating: () => void;
  onRemovePrice: () => void;
  onClearAll: () => void;
  onSortChange: (sort: SortOption) => void;
  onViewChange: (view: "grid" | "list") => void;
  onOpenMobileFilters: () => void;
};

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
      {label}
      <button
        onClick={onRemove}
        className="text-gray-400 transition-colors hover:text-gray-700"
        aria-label={`Quitar filtro ${label}`}
      >
        <X className="size-3" />
      </button>
    </span>
  );
}

export function SortBar({
  count,
  totalCount,
  filters,
  onRemoveCategory,
  onRemoveTag,
  onRemoveRating,
  onRemovePrice,
  onClearAll,
  onSortChange,
  onViewChange,
  onOpenMobileFilters,
}: SortBarProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 1000 ||
    filters.minRating > 0 ||
    filters.tags.length > 0;

  const activeFilterCount =
    filters.categories.length +
    filters.tags.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 1000 ? 1 : 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: count + mobile filter button */}
        <div className="flex items-center gap-3">
          {/* Mobile filter trigger */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 md:hidden"
            onClick={onOpenMobileFilters}
          >
            <SlidersHorizontal className="size-3.5" />
            Filtrar
            {activeFilterCount > 0 && (
              <span className="bg-brand-accent ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <p className="text-sm text-gray-500">
            <span className="text-brand-dark font-semibold">{count}</span>{" "}
            {count === totalCount ? (
              "productos"
            ) : (
              <>
                de{" "}
                <span className="text-brand-dark font-semibold">
                  {totalCount}
                </span>{" "}
                productos
              </>
            )}
          </p>
        </div>

        {/* Right: sort + view toggle */}
        <div className="flex items-center gap-2">
          <Select
            value={filters.sortBy}
            onValueChange={(v) => onSortChange(v as SortOption)}
          >
            <SelectTrigger size="sm" className="w-auto text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="hidden items-center overflow-hidden rounded-lg border border-gray-200 sm:flex">
            <button
              onClick={() => onViewChange("grid")}
              className={cn(
                "p-1.5 transition-colors",
                filters.viewMode === "grid"
                  ? "bg-brand-dark text-white"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-700",
              )}
              aria-label="Vista grilla"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={cn(
                "border-l border-gray-200 p-1.5 transition-colors",
                filters.viewMode === "list"
                  ? "bg-brand-dark text-white"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-700",
              )}
              aria-label="Vista lista"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.categories.map((cat) => (
            <ActiveChip
              key={cat}
              label={cat}
              onRemove={() => onRemoveCategory(cat)}
            />
          ))}
          {filters.tags.map((tag) => (
            <ActiveChip
              key={tag}
              label={tag}
              onRemove={() => onRemoveTag(tag)}
            />
          ))}
          {filters.minRating > 0 && (
            <ActiveChip
              label={`${filters.minRating}★ o más`}
              onRemove={onRemoveRating}
            />
          )}
          {(filters.priceMin > 0 || filters.priceMax < 1000) && (
            <ActiveChip
              label={`S/ ${filters.priceMin} – S/ ${filters.priceMax}`}
              onRemove={onRemovePrice}
            />
          )}

          <button
            onClick={onClearAll}
            className="text-brand-accent hover:text-brand-accent-hover text-xs font-medium transition-colors"
          >
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
}
