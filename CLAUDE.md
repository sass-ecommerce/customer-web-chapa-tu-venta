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

### Path Aliases

`@/*` maps to the repository root (configured in `tsconfig.json`).
