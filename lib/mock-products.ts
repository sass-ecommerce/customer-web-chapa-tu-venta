export type MockProduct = {
  id: number;
  name: string;
  category:
    | "Calzado"
    | "Electrónica"
    | "Ropa"
    | "Hogar"
    | "Deporte"
    | "Accesorios";
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "NUEVO" | "OFERTA" | "TOP";
  discount?: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export const mockProducts: MockProduct[] = [
  // Calzado (4)
  {
    id: 1,
    name: "Sneakers Urban Pro",
    category: "Calzado",
    price: 89.99,
    originalPrice: 120,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 25,
    rating: 4.5,
    reviewCount: 128,
    createdAt: "2026-01-15",
  },
  {
    id: 2,
    name: "Zapatillas Running V2",
    category: "Calzado",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format",
    badge: "TOP",
    rating: 4.8,
    reviewCount: 214,
    createdAt: "2025-11-20",
  },
  {
    id: 3,
    name: "Botas de Montaña",
    category: "Calzado",
    price: 149,
    originalPrice: 180,
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 17,
    rating: 4.2,
    reviewCount: 67,
    createdAt: "2026-02-01",
  },
  {
    id: 4,
    name: "Mocasines Clásicos",
    category: "Calzado",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 3.9,
    reviewCount: 23,
    createdAt: "2026-02-10",
  },

  // Electrónica (4)
  {
    id: 5,
    name: "Laptop Ultrabook X1",
    category: "Electrónica",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    badge: "TOP",
    rating: 4.9,
    reviewCount: 342,
    createdAt: "2025-10-05",
  },
  {
    id: 6,
    name: "Auriculares Pro Max",
    category: "Electrónica",
    price: 149,
    originalPrice: 199,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 25,
    rating: 4.6,
    reviewCount: 189,
    createdAt: "2025-12-12",
  },
  {
    id: 7,
    name: "Smartwatch Series 5",
    category: "Electrónica",
    price: 199,
    originalPrice: 249,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 20,
    rating: 4.3,
    reviewCount: 97,
    createdAt: "2026-01-08",
  },
  {
    id: 8,
    name: 'Monitor 4K 27"',
    category: "Electrónica",
    price: 449,
    originalPrice: 499,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 10,
    rating: 4.7,
    reviewCount: 156,
    createdAt: "2025-09-30",
  },

  // Ropa (4)
  {
    id: 9,
    name: "Camiseta Deportiva",
    category: "Ropa",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 4.1,
    reviewCount: 54,
    createdAt: "2026-02-05",
  },
  {
    id: 10,
    name: "Chaqueta Impermeable",
    category: "Ropa",
    price: 119,
    originalPrice: 150,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 21,
    rating: 4.4,
    reviewCount: 88,
    createdAt: "2025-11-01",
  },
  {
    id: 11,
    name: "Pantalón Jogger Pro",
    category: "Ropa",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 3.8,
    reviewCount: 31,
    createdAt: "2026-02-18",
  },
  {
    id: 12,
    name: "Sudadera Hoodie Classic",
    category: "Ropa",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop&auto=format",
    badge: "TOP",
    rating: 4.6,
    reviewCount: 172,
    createdAt: "2025-10-15",
  },

  // Hogar (4)
  {
    id: 13,
    name: "Silla Ergonómica Pro",
    category: "Hogar",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 4.8,
    reviewCount: 45,
    createdAt: "2026-02-12",
  },
  {
    id: 14,
    name: "Lámpara de Escritorio LED",
    category: "Hogar",
    price: 39.99,
    originalPrice: 55,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 27,
    rating: 4.2,
    reviewCount: 76,
    createdAt: "2025-12-20",
  },
  {
    id: 15,
    name: "Set Cocina Premium",
    category: "Hogar",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&auto=format",
    badge: "TOP",
    rating: 4.5,
    reviewCount: 134,
    createdAt: "2025-11-10",
  },
  {
    id: 16,
    name: "Almohada Viscoelástica",
    category: "Hogar",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 3.7,
    reviewCount: 19,
    createdAt: "2026-02-20",
  },

  // Deporte (4)
  {
    id: 17,
    name: "Set Yoga Premium",
    category: "Deporte",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=400&h=400&fit=crop&auto=format",
    badge: "TOP",
    rating: 4.7,
    reviewCount: 203,
    createdAt: "2025-10-28",
  },
  {
    id: 18,
    name: "Botella Termo 750ml",
    category: "Deporte",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 4.0,
    reviewCount: 62,
    createdAt: "2026-01-25",
  },
  {
    id: 19,
    name: "Mancuernas Ajustables",
    category: "Deporte",
    price: 189,
    originalPrice: 230,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 18,
    rating: 4.5,
    reviewCount: 118,
    createdAt: "2025-12-05",
  },
  {
    id: 20,
    name: "Cuerda para Saltar Pro",
    category: "Deporte",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1601422407692-ad47bbca20c8?w=400&h=400&fit=crop&auto=format",
    rating: 3.9,
    reviewCount: 44,
    createdAt: "2025-09-15",
  },

  // Accesorios (4)
  {
    id: 21,
    name: "Mochila Explorer 30L",
    category: "Accesorios",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 4.3,
    reviewCount: 91,
    createdAt: "2026-01-30",
  },
  {
    id: 22,
    name: "Gafas de Sol UV400",
    category: "Accesorios",
    price: 39.99,
    originalPrice: 60,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&auto=format",
    badge: "OFERTA",
    discount: 33,
    rating: 4.1,
    reviewCount: 57,
    createdAt: "2025-12-28",
  },
  {
    id: 23,
    name: "Cinturón de Cuero",
    category: "Accesorios",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&auto=format",
    badge: "TOP",
    rating: 4.4,
    reviewCount: 83,
    createdAt: "2025-11-18",
  },
  {
    id: 24,
    name: "Sombrero Bucket Hat",
    category: "Accesorios",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop&auto=format",
    badge: "NUEVO",
    rating: 3.6,
    reviewCount: 28,
    createdAt: "2026-02-15",
  },
];

export const CATEGORIES = [
  "Calzado",
  "Electrónica",
  "Ropa",
  "Hogar",
  "Deporte",
  "Accesorios",
] as const;

export const TAGS = ["NUEVO", "OFERTA", "TOP"] as const;

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating";

export function getProductById(id: number): MockProduct | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getProductsByBadge(
  badge: "NUEVO" | "OFERTA" | "TOP",
): MockProduct[] {
  return mockProducts.filter((p) => p.badge === badge);
}

export function getLatestProducts(n: number): MockProduct[] {
  return [...mockProducts]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, n);
}
