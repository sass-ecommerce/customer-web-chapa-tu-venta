import type { ApiCategory } from "@/lib/api/categories";

export type IndentedCategory = {
  category: ApiCategory;
  depth: number;
};

// Flattens the parentId tree into display order: each category followed by its
// subcategories, with the depth used for indentation. A category whose parent
// isn't in the list is shown as a top-level one so it never disappears.
export function toIndentedCategories(
  categories: ApiCategory[],
): IndentedCategory[] {
  const ids = new Set(categories.map((c) => c.categoryId));
  const childrenOf = new Map<string | null, ApiCategory[]>();

  for (const category of categories) {
    const parentKey =
      category.parentId && ids.has(category.parentId)
        ? category.parentId
        : null;
    childrenOf.set(parentKey, [...(childrenOf.get(parentKey) ?? []), category]);
  }

  const result: IndentedCategory[] = [];
  const visit = (parentKey: string | null, depth: number) => {
    for (const category of childrenOf.get(parentKey) ?? []) {
      result.push({ category, depth });
      visit(category.categoryId, depth + 1);
    }
  };
  visit(null, 0);

  return result;
}
