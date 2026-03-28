export type Benefit = {
  icon: "truck" | "shield-check" | "rotate-ccw" | "headphones" | "tag" | "clock";
  title: string;
  description: string;
};

export type PromoBanner = {
  badge?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroConfig = {
  heading: string;
  description: string;
  ctaPrimaryLabel: string;
  discountBadge?: string;   // e.g. "50%" — shows circular badge on image
  discountLabel?: string;   // e.g. "Hasta 50% OFF" — shows below heading
  image: string;
  stats?: HeroStat[];
};

export type TenantConfig = {
  name: string;
  slug: string;
  logo: string;
  primaryColor?: string;
  hero?: HeroConfig;
  benefits?: Benefit[];
  promoBanner?: PromoBanner;
};

// ─── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_BENEFITS: Benefit[] = [
  { icon: "truck",        title: "Envío gratis",    description: "En pedidos desde S/ 99" },
  { icon: "shield-check", title: "Pago seguro",     description: "Transacciones protegidas" },
  { icon: "rotate-ccw",   title: "Devoluciones",    description: "Hasta 30 días sin costo" },
  { icon: "headphones",   title: "Soporte 24/7",    description: "Estamos para ayudarte" },
];

export const DEFAULT_HERO: HeroConfig = {
  heading: "Descubre\nNuestra Tienda",
  description: "Encuentra los mejores productos al mejor precio. Calidad garantizada.",
  ctaPrimaryLabel: "Ver productos",
  image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&h=920&fit=crop&auto=format",
  stats: [
    { value: "1K+",  label: "Clientes"   },
    { value: "4.5★", label: "Valoración" },
    { value: "5K+",  label: "Pedidos"    },
  ],
};

// ─── Tenants ──────────────────────────────────────────────────────────────────

export const TENANTS: Record<string, TenantConfig> = {
  demo: {
    name: "Demo Store",
    slug: "demo",
    logo: "🛍️",
    hero: {
      heading: "Redefine\nTu Estilo",
      description: "Descubre las últimas tendencias de la temporada. Moda que habla por ti.",
      ctaPrimaryLabel: "Comprar ahora",
      discountBadge: "50%",
      discountLabel: "Hasta 50% OFF",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&h=920&fit=crop&auto=format",
      stats: [
        { value: "2K+",  label: "Clientes"   },
        { value: "4.8★", label: "Valoración" },
        { value: "10K",  label: "Pedidos"    },
      ],
    },
    promoBanner: {
      badge: "Nueva colección",
      title: "Estilo que habla por ti",
      description: "Descubre las últimas tendencias de la temporada con hasta 30% de descuento.",
      ctaLabel: "Explorar colección",
      ctaHref: "/catalog",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop&auto=format",
    },
  },
  beibeli: {
    name: "BeliBeli",
    slug: "beibeli",
    logo: "🎁",
    hero: {
      heading: "El Regalo\nPerfecto",
      description: "Encuentra algo especial para cada persona. Envío gratis en tu primer pedido.",
      ctaPrimaryLabel: "Ver regalos",
      discountBadge: "30%",
      discountLabel: "Hasta 30% OFF",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=700&h=920&fit=crop&auto=format",
      stats: [
        { value: "5K+",  label: "Clientes"   },
        { value: "4.9★", label: "Valoración" },
        { value: "20K",  label: "Pedidos"    },
      ],
    },
    benefits: [
      { icon: "tag",        title: "Precios bajos",     description: "Siempre las mejores ofertas" },
      { icon: "truck",      title: "Envío express",     description: "Recíbelo en 24 horas" },
      { icon: "rotate-ccw", title: "Devoluciones",      description: "Sin preguntas, 15 días" },
      { icon: "clock",      title: "Horario extendido", description: "Atención hasta las 10pm" },
    ],
    promoBanner: {
      badge: "Temporada de regalos",
      title: "El regalo perfecto está aquí",
      description: "Encuentra algo especial para cada persona. Envío gratis en tu primer pedido.",
      ctaLabel: "Ver regalos",
      ctaHref: "/catalog",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=400&fit=crop&auto=format",
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getTenantConfig(slug: string): TenantConfig | null {
  return TENANTS[slug] ?? null;
}

export function getTenantBenefits(config: TenantConfig): Benefit[] {
  return config.benefits ?? DEFAULT_BENEFITS;
}

