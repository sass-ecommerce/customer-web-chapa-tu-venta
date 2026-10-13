This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## APIs que consume

Casi todas las llamadas se hacen desde el servidor (Server Components, route handlers y `proxy.ts`). El navegador solo llama a las rutas internas `/api/*` para paginar ("cargar más").

### API de productos — `NEXT_PUBLIC_API_URL`

API Gateway + lambda `get-dynamodb-products` (repo `lambda-users-products-v1`), que lee DynamoDB.

| Método | Endpoint | Para qué | Dónde | Caché |
|---|---|---|---|---|
| GET | `/products?tenantId&limit&nextToken` | Listado paginado: home, catálogo y productos relacionados del detalle | `lib/api/products.ts` → `fetchProducts` | 20 s |
| GET | `/products/{productId}?tenantId` | Detalle: galería de imágenes, metadata SEO, imagen Open Graph y productos de una colección | `lib/api/products.ts` → `fetchProductById` | 20 s |

### API de colecciones — `NEXT_PUBLIC_COLLECTIONS_API_URL`

API Gateway + lambda `get-dynamodb-collections` (repo `lambda-users-products-v1`).

| Método | Endpoint | Para qué | Dónde | Caché |
|---|---|---|---|---|
| GET | `/collections?tenantId&limit&nextToken` | Listado de colecciones (trae `productCount`, no `productIds`) | `lib/api/collections.ts` → `fetchCollections` | 20 s |
| GET | `/collections/{collectionId}?tenantId` | Detalle de colección (trae `productIds`; cada producto se pide aparte con `/products/{productId}`) | `lib/api/collections.ts` → `fetchCollectionById` | 20 s |

### API de categorías — `NEXT_PUBLIC_CATEGORIES_API_URL`

API Gateway + lambda `get-dynamodb-categories` (repo `lambda-users-products-v1`), que lee la tabla `ctv-tbl-categories-{env}`. Esa tabla se llena desde el backend con eventos de EventBridge (`ctv.categories`).

| Método | Endpoint | Para qué | Dónde | Caché |
|---|---|---|---|---|
| GET | `/categories?tenantId` | Categorías con productos activos (lista plana con `parentId`, ordenada por nombre): selector del header y filtro del catálogo | `lib/api/categories.ts` → `getTenantCategories` | 5 min |

### Backend principal — `NEXT_PUBLIC_STORAGE_API_URL`

`backend-chapa-tu-venta` (NestJS). A pesar del nombre de la variable, solo se usa para tenants.

| Método | Endpoint | Para qué | Dónde | Caché |
|---|---|---|---|---|
| GET | `/api/tenants/by-domain?domain={slug}` | Resolver el `tenantId` a partir del slug o subdominio. Se llama en cada request desde `proxy.ts` y viaja como header `x-tenant-id` | `lib/api/tenants.ts` → `resolveTenantId` | Sin caché |
| GET | `/api/tenants/by-domain?domain={slug}` | Branding de la tienda (`name`, `logoUrl`); `lib/config/tenants.ts` queda como respaldo | `lib/api/tenants.ts` → `getTenantBranding` | 5 min |

### Imágenes — CloudFront

Las imágenes se cargan siempre desde CloudFront, con la URL que ya viene en la respuesta de la API: `images[].url` en productos y `coverImageUrl` en colecciones. No se consulta ningún endpoint para obtenerlas.

### Autenticación — AWS Cognito (Amplify v6)

Configurado en `lib/config/amplify-config.ts` con `NEXT_PUBLIC_COGNITO_USER_POOL_ID` y `NEXT_PUBLIC_COGNITO_CLIENT_ID`. Usa `signUp`, `confirmSignUp`, `signIn`, `signOut`, `getCurrentUser`, `resetPassword` y `confirmResetPassword` desde `lib/auth/auth-context.tsx` y `components/auth/*`. Se desactiva con `LOGIN_ENABLED=false`.

### Rutas internas (route handlers de Next)

Las llama el navegador para paginar; por dentro usan las APIs de arriba.

| Método | Ruta | Para qué | Llamada desde |
|---|---|---|---|
| GET | `/api/products?tenant&nextToken&limit` | Siguiente página del catálogo (9 por defecto) | `components/catalog/catalog-view.tsx` |
| GET | `/api/collections/{id}/products?tenant&nextToken&limit` | Siguiente página de productos de una colección (12 por defecto) | `components/collections/collection-detail-view.tsx` |

### Servicios externos (solo imágenes Open Graph)

`lib/og/assets.ts`, usado por las rutas `og-image` de producto y colección:

- **Google Fonts** (`fonts.googleapis.com/css2` y los archivos de fuente que devuelve), con caché permanente.
- **Descarga de imágenes** (foto de CloudFront y logo de la tienda) para incrustarlas como data URI.

### Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_API_URL` | API de productos |
| `NEXT_PUBLIC_COLLECTIONS_API_URL` | API de colecciones |
| `NEXT_PUBLIC_CATEGORIES_API_URL` | API de categorías |
| `NEXT_PUBLIC_STORAGE_API_URL` | Backend principal (tenants) |
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID`, `NEXT_PUBLIC_COGNITO_CLIENT_ID` | Cognito |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | Opcional: `fb:app_id` en la metadata |
| `NEXT_PUBLIC_DISABLE_SUBDOMAIN_REWRITE` | `true` en local: el tenant va en el path (`/demo/...`) en vez del subdominio |
| `ROOT_DOMAIN` | Dominio raíz para resolver el subdominio en producción (default `localhost:3000`) |
| `LOGIN_ENABLED`, `CART_ENABLED` | Feature flags (`false` para desactivar) |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
