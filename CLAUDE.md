# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test runner is configured in this project.

## Architecture

This is a **Next.js 16 (App Router)** component showcase for the "Chapa Tu Venta" customer web, built with React 19, TypeScript, and Tailwind CSS v4.

### Directory Structure

- `app/` — Next.js App Router pages and layouts; `page.tsx` renders the component showcase
- `components/ui/` — shadcn/ui component library (Button, Card, Input, Select, Combobox, Field, etc.)
- `components/component-example.tsx` — Main demo page showing UI components in use
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Component Patterns

All UI components follow consistent conventions:

- **CVA (class-variance-authority)** for variant management (size/style variants)
- **`data-slot` attributes** on DOM elements for styling hooks (e.g., `data-slot="button"`)
- **Radix UI `Slot`** for polymorphic composition (`asChild` prop)
- **`cn()` utility** for all Tailwind class merging
- **Compound component pattern** (e.g., `Card`, `CardHeader`, `CardContent`, `CardFooter`)
- **`"use client"` directive** on interactive components

### Styling

- Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css`
- All design tokens (colors, radius, etc.) defined as CSS custom properties in `globals.css`
- Dark mode supported via a custom Tailwind variant
- `@base-ui/react` v1 and `radix-ui` v1 used as headless primitive layers

### shadcn/ui Configuration

`components.json` — style: `radix-nova`, icon library: `lucide`, base color: `neutral`, CSS variables enabled. Add new shadcn components with:

```bash
npx shadcn@latest add <component-name>
```

### Tenant navigation

**Always use `tenantHref(tenant, path)`** from `@/lib/tenant-href` when building links or `router.push` calls inside tenant routes — never hardcode `/${tenant}/...` directly. This function handles subdomain-based routing in production (where the tenant is inferred from the subdomain) vs. path-based routing in development.

```tsx
import { tenantHref } from "@/lib/tenant-href";

// ✅ Correct
<Link href={tenantHref(tenant, "/catalog")} />
router.push(tenantHref(tenant, "/checkout"));

// ❌ Wrong
<Link href={`/${tenant}/catalog`} />
router.push(`/${tenant}/checkout`);
```

### State Management

**Always use Zustand** for any shared or cross-component state — never `useState` for state that needs to be accessed by more than one component, and never React Context for application state.

- All stores live in `lib/stores/` and follow the pattern `use<Name>Store.ts`
- Each store must be typed with TypeScript interfaces
- Prefer slices for large stores (split by domain: cart, filters, UI, etc.)

```tsx
// ✅ Correct — shared state in a Zustand store
import { useCartStore } from "@/lib/stores/useCartStore";
const { items, addItem } = useCartStore();

// ❌ Wrong — lifting state via props or Context for cross-component state
const [cartItems, setCartItems] = useState([]);
```

### Path Aliases

`@/*` maps to the repository root (configured in `tsconfig.json`).

## SaaS Multi-tenant Component Philosophy

This project is the **customer-facing storefront of a SaaS platform**. Any tenant (store) can use this codebase — from a store with 5 products to one with 5,000. Every component must be designed with this in mind.

### Rules for new components

- **Tenant-agnostic by default** — components must not hardcode content, copy, or data specific to one store. Text, images, and configuration must come from props or `TenantConfig`.
- **Graceful with sparse data** — a component must look and work correctly even if the tenant has few products, no reviews, or incomplete config. Avoid layouts that break or look empty with little content.
- **Configurable via `TenantConfig`** — any content that may differ between tenants (banners, benefits, colors, labels) must be defined in `lib/tenants.ts` and passed as props. Use `getTenantConfig(slug)` to read it.
- **No hardcoded mock data in tenant pages** — mock/placeholder data belongs in `lib/mock-*.ts` files, never inlined in page or layout components.
- **Always pass `tenant` prop for navigation** — any component that renders links must receive `tenant: string` and use `tenantHref(tenant, path)`.

### What "tenant-oriented" means in practice

```tsx
// ✅ Correct — content comes from TenantConfig, works for any store
export function PromoBanner({ banner, tenant }: { banner: PromoBanner; tenant: string }) { ... }

// ❌ Wrong — hardcoded for one store, useless for others
export function PromoBanner() {
  return <div>Demo Store — Gran Venta de Verano</div>;
}
```

```tsx
// ✅ Correct — renders nothing when tenant has no banner configured
{config?.promoBanner && <PromoBanner banner={config.promoBanner} tenant={tenant} />}

// ❌ Wrong — crashes or looks broken when data is missing
<PromoBanner banner={undefined} tenant={tenant} />
```
