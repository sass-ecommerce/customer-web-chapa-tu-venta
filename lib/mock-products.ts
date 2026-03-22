export type MockProduct = {
  id: number;
  name: string;
  category: "Calzado" | "Electrónica" | "Ropa" | "Hogar" | "Deporte" | "Accesorios";
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
    image: "👟",
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
    image: "🏃",
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
    image: "🥾",
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
    image: "👞",
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
    image: "💻",
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
    image: "🎧",
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
    image: "⌚",
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
    image: "🖥️",
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
    image: "👕",
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
    image: "🧥",
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
    image: "👖",
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
    image: "🧤",
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
    image: "🪑",
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
    image: "💡",
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
    image: "🍳",
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
    image: "🛏️",
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
    image: "🧘",
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
    image: "🍶",
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
    image: "🏋️",
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
    image: "🤸",
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
    image: "🎒",
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
    image: "🕶️",
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
    image: "👜",
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
    image: "🧢",
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
