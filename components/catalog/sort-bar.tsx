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
import { cn } from "@/lib/utils";
import type { FilterState } from "./catalog-view";
import type { SortOption } from "@/lib/mock-products";

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
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-gray-700 transition-colors"
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
            className="md:hidden flex items-center gap-1.5"
            onClick={onOpenMobileFilters}
          >
            <SlidersHorizontal className="size-3.5" />
            Filtrar
            {activeFilterCount > 0 && (
              <span className="bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ml-0.5">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <p className="text-sm text-gray-500">
            <span className="font-semibold text-brand-dark">{count}</span>{" "}
            {count === totalCount ? (
              "productos"
            ) : (
              <>
                de{" "}
                <span className="font-semibold text-brand-dark">
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
          <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewChange("grid")}
              className={cn(
                "p-1.5 transition-colors",
                filters.viewMode === "grid"
                  ? "bg-brand-dark text-white"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              )}
              aria-label="Vista grilla"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={cn(
                "p-1.5 transition-colors border-l border-gray-200",
                filters.viewMode === "list"
                  ? "bg-brand-dark text-white"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
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
              label={`$${filters.priceMin} – $${filters.priceMax}`}
              onRemove={onRemovePrice}
            />
          )}

          <button
            onClick={onClearAll}
            className="text-xs text-brand-accent hover:text-brand-accent-hover font-medium transition-colors"
          >
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
}
