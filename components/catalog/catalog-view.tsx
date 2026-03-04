"use client";

import { useMemo, useReducer, useCallback } from "react";
import Link from "next/link";
import { mockProducts } from "@/lib/mock-products";
import type { SortOption } from "@/lib/mock-products";
import { FilterSidebar, FilterDrawer } from "./filter-sidebar";
import { SortBar } from "./sort-bar";
import { ProductGrid } from "./product-grid";

export type FilterState = {
  categories: string[];
  priceMin: number;
  priceMax: number;
  minRating: number;
  tags: string[];
  sortBy: SortOption;
  viewMode: "grid" | "list";
  showMobileFilters: boolean;
  page: number;
};

const initialState: FilterState = {
  categories: [],
  priceMin: 0,
  priceMax: 1000,
  minRating: 0,
  tags: [],
  sortBy: "relevance",
  viewMode: "grid",
  showMobileFilters: false,
  page: 1,
};

type Action =
  | { type: "TOGGLE_CATEGORY"; category: string }
  | { type: "SET_PRICE"; min: number; max: number }
  | { type: "SET_RATING"; rating: number }
  | { type: "TOGGLE_TAG"; tag: string }
  | { type: "SET_SORT"; sort: SortOption }
  | { type: "SET_VIEW"; view: "grid" | "list" }
  | { type: "TOGGLE_MOBILE_FILTERS" }
  | { type: "CLOSE_MOBILE_FILTERS" }
  | { type: "LOAD_MORE" }
  | { type: "CLEAR_ALL" }
  | { type: "REMOVE_CATEGORY"; category: string }
  | { type: "REMOVE_TAG"; tag: string }
  | { type: "REMOVE_RATING" }
  | { type: "REMOVE_PRICE" };

function reducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "TOGGLE_CATEGORY":
      return {
        ...state,
        page: 1,
        categories: state.categories.includes(action.category)
          ? state.categories.filter((c) => c !== action.category)
          : [...state.categories, action.category],
      };
    case "SET_PRICE":
      return { ...state, page: 1, priceMin: action.min, priceMax: action.max };
    case "SET_RATING":
      return { ...state, page: 1, minRating: action.rating };
    case "TOGGLE_TAG":
      return {
        ...state,
        page: 1,
        tags: state.tags.includes(action.tag)
          ? state.tags.filter((t) => t !== action.tag)
          : [...state.tags, action.tag],
      };
    case "SET_SORT":
      return { ...state, page: 1, sortBy: action.sort };
    case "SET_VIEW":
      return { ...state, viewMode: action.view };
    case "TOGGLE_MOBILE_FILTERS":
      return { ...state, showMobileFilters: !state.showMobileFilters };
    case "CLOSE_MOBILE_FILTERS":
      return { ...state, showMobileFilters: false };
    case "LOAD_MORE":
      return { ...state, page: state.page + 1 };
    case "CLEAR_ALL":
      return { ...initialState, sortBy: state.sortBy, viewMode: state.viewMode };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        page: 1,
        categories: state.categories.filter((c) => c !== action.category),
      };
    case "REMOVE_TAG":
      return {
        ...state,
        page: 1,
        tags: state.tags.filter((t) => t !== action.tag),
      };
    case "REMOVE_RATING":
      return { ...state, page: 1, minRating: 0 };
    case "REMOVE_PRICE":
      return { ...state, page: 1, priceMin: 0, priceMax: 1000 };
    default:
      return state;
  }
}

export function CatalogView() {
  const [filters, dispatch] = useReducer(reducer, initialState);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Tag filter
    if (filters.tags.length > 0) {
      result = result.filter((p) => p.badge && filters.tags.includes(p.badge));
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  const handleCategoryChange = useCallback(
    (cat: string) => dispatch({ type: "TOGGLE_CATEGORY", category: cat }),
    []
  );
  const handlePriceChange = useCallback(
    (min: number, max: number) => dispatch({ type: "SET_PRICE", min, max }),
    []
  );
  const handleRatingChange = useCallback(
    (rating: number) => dispatch({ type: "SET_RATING", rating }),
    []
  );
  const handleTagChange = useCallback(
    (tag: string) => dispatch({ type: "TOGGLE_TAG", tag }),
    []
  );
  const handleClearAll = useCallback(() => dispatch({ type: "CLEAR_ALL" }), []);

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-dark font-medium">Catálogo</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black font-body text-brand-dark">
            Catálogo
          </h1>
        </div>
      </div>

      {/* Main workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-[260px] shrink-0">
            <div className="sticky top-[108px]">
              <FilterSidebar
                filters={filters}
                onCategoryChange={handleCategoryChange}
                onPriceChange={handlePriceChange}
                onRatingChange={handleRatingChange}
                onTagChange={handleTagChange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Sort bar */}
            <SortBar
              count={filteredProducts.length}
              totalCount={mockProducts.length}
              filters={filters}
              onRemoveCategory={(cat) =>
                dispatch({ type: "REMOVE_CATEGORY", category: cat })
              }
              onRemoveTag={(tag) => dispatch({ type: "REMOVE_TAG", tag })}
              onRemoveRating={() => dispatch({ type: "REMOVE_RATING" })}
              onRemovePrice={() => dispatch({ type: "REMOVE_PRICE" })}
              onClearAll={handleClearAll}
              onSortChange={(sort) => dispatch({ type: "SET_SORT", sort })}
              onViewChange={(view) => dispatch({ type: "SET_VIEW", view })}
              onOpenMobileFilters={() =>
                dispatch({ type: "TOGGLE_MOBILE_FILTERS" })
              }
            />

            {/* Product grid */}
            <ProductGrid
              products={filteredProducts}
              viewMode={filters.viewMode}
              page={filters.page}
              onLoadMore={() => dispatch({ type: "LOAD_MORE" })}
              onClearFilters={handleClearAll}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filters.showMobileFilters && (
        <FilterDrawer
          filters={filters}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
          onRatingChange={handleRatingChange}
          onTagChange={handleTagChange}
          onClearAll={handleClearAll}
          onClose={() => dispatch({ type: "CLOSE_MOBILE_FILTERS" })}
          onApply={() => dispatch({ type: "CLOSE_MOBILE_FILTERS" })}
        />
      )}
    </div>
  );
}
