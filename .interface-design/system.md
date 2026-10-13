# Interface Design System — customer-web

Storefront white-label (SaaS multi-tenant). Lo que ve el comprador lleva **solo la marca del tenant** — nunca "Chapa Tu Venta" ni su dominio.

## Open Graph previews — "Vitrina + etiqueta"

Componentes compartidos en `lib/og/hanging-tag.tsx` (`OgCanvas`, `OgPhoto`, `StoreBrand`, `HangingTag`, tokens); helpers en `lib/og/assets.ts` (`loadGoogleFont`, `toImageDataUri`, `readableTextOn`, `formatPrice`).
Implementaciones: `app/[tenant]/collections/[id]/og-image/route.tsx`, `app/[tenant]/products/[id]/og-image/route.tsx`.

### Intent
Comprador en Perú que recibe el link por WhatsApp, en el celular, a ~300px de ancho entre otros mensajes. Decide en medio segundo si toca. Debe leerse como "tienda" sin texto: vitrina, etiqueta de precio colgante.

### Firma
**Etiqueta colgante** (tag de precio) con cordel y ojal, rotada `-4deg` desde arriba al centro. Lleva el dato principal (nombre de colección/producto) y un dato secundario tras un divisor punteado (conteo, precio).

### Tokens
| Token | Valor | Origen |
|---|---|---|
| `VITRINA` | `#f5f6f7` | `--brand-bg` — fondo y relleno del ojal |
| `INK` | `#1a1a1a` | `--brand-dark` — texto; fallback de la etiqueta |
| `INK_MUTED` | `rgba(26,26,26,0.55)` | divisor sobre etiquetas claras |
| Cordel | 2px × 104px; sobre foto `rgba(255,255,255,0.9)` + contorno `0 0 0 1px rgba(0,0,0,0.35)`, sobre `VITRINA` `rgba(26,26,26,0.35)` | prop `overPhoto` |
| Color de etiqueta | `TenantConfig.primaryColor` (hex) o `INK` | texto vía `readableTextOn()` |

### Layout (1200×630)
- Con imagen: la foto ocupa **todo el lienzo** (`objectFit: cover`). La etiqueta (380px) cuelga del margen izquierdo (`EDGE` = 56px) para dejar libre el producto. Se descartó el panel gris + foto parcial: con marca quedaba un panel vacío y la etiqueta tapaba el producto.
- Sin imagen: etiqueta centrada sobre `VITRINA` (`tagLeft(false)`).
- Marca del tenant: píldora blanca abajo a la izquierda (`bottom 44, left EDGE`), logo circular 44px + nombre DM Sans 700 24px, sombra `0 6px 18px rgba(0,0,0,0.16)`. Se lee sobre cualquier foto.
- Trade-off aceptado: la miniatura cuadrada pequeña de WhatsApp (centro de 630px) recorta parte de la etiqueta; la preview grande (Facebook, WhatsApp) la muestra completa.

### Etiqueta
- Solo la tarjeta gira (`rotate(-4deg)`, origen `50% 0`); el cordel queda vertical. Borde `1px rgba(255,255,255,0.12)` para separarla de fotos oscuras.
- `padding 28px 40px 40px`, `borderRadius 22`, sombra única `0 18px 40px rgba(0,0,0,0.18)`.
- Ojal: círculo 22px, fondo `VITRINA`, borde 3px `rgba(255,255,255,0.45)`, 28px debajo.
- Label: DM Sans 500, 18px, `letterSpacing 4`, opacity 0.7, mayúsculas ("COLECCIÓN").
- Título: Playfair Display 700, `lineHeight 1.05`; 64px (≤16 chars) / 52px (≤28) / 42px; truncar a 48 chars.
- Dato secundario: divisor `2px dashed`, `marginTop 28`, `paddingTop 20`, DM Sans 500 26px. Se omite si no hay dato.

### Reglas técnicas
- Generar con route handler `<segmento>/og-image/route.tsx` y URL absoluta vía `tenantPublicUrl()` — **no** con `opengraph-image.tsx` (en prod con subdominio la URL interna `/{tenant}/...` da 404).
- Incrustar imágenes como data URI (`toImageDataUri`): las URLs prefirmadas de S3 vencen en 1h. webp/avif no soportados → layout sin imagen.
- Fuentes: `loadGoogleFont` con subset `text`; `emoji: "twemoji"` para logos emoji.
- Metadata: `og:title` = nombre del ítem; tienda en `og:site_name`; `locale es_PE`; `twitter.card summary_large_image`; imagen con `width/height/alt`.
- Cache: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800`.

### Variantes
| | Colección | Producto |
|---|---|---|
| Imagen | portada, a todo el ancho | foto principal, a todo el ancho |
| Label | `COLECCIÓN` | categoría real en mayúsculas, o `PRODUCTO` |
| Título | 64 / 52 / 42px, trunca a 48 | 56 / 46 / 40px, trunca a 56 |
| Dato secundario | `N productos`, DM Sans 500 26px | precio `S/ 1,500.00`, DM Sans 700 44px |
| Sin marca del tenant | sin píldora; mismo layout | sin píldora; mismo layout |

- Marca: `getTenantBranding(tenant)` (`lib/api/tenants.ts`) — `name`/`logoUrl` de `GET /tenants/by-domain` (lo que el dueño sube desde la app), con `TenantConfig` como respaldo (emoji, `primaryColor`).
- Producto: solo datos reales de la API (`getTenantRawProduct`). Nunca `originalPrice`, `discount` ni `badge` del adapter: hoy salen de mocks.
- Pendiente: catálogo / home del tenant — etiqueta con nombre de la tienda; imagen = `hero.image` de `TenantConfig`.
