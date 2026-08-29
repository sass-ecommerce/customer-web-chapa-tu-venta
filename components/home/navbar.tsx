"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  Package,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useCartStore } from "@/lib/stores/cart-store";
import { tenantHref } from "@/lib/utils/tenant-href";
import { mockProducts } from "@/lib/mocks/mock-products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({
  tenant,
  showLogin = true,
  showCart = true,
}: {
  tenant: string;
  showLogin?: boolean;
  showCart?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isLoading, logOut } = useAuth();
  const totalCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const openSheet = useCartStore((s) => s.openSheet);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return mockProducts
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setIsSearchOpen(false);
    router.push(tenantHref(tenant, `/catalog?q=${encodeURIComponent(q)}`));
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* Top utility bar */}
      {showLogin && (
        <div className="border-b border-gray-200 bg-gray-100 text-xs text-gray-600">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <span className="font-medium">📱 Descargar App</span>
            <div className="hidden items-center gap-6 md:flex">
              {["Mitra", "Sobre Nosotros", "Atención", "Promo"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="transition-colors hover:text-gray-900"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {!isLoading &&
                (user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1.5 transition-colors hover:text-gray-900 focus:outline-none">
                        <span className="bg-brand-accent flex h-6 w-6 items-center justify-center rounded-full text-white">
                          <User size={12} />
                        </span>
                        <span className="max-w-[120px] truncate font-medium">
                          {user.signInDetails?.loginId ?? user.username}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuLabel className="truncate px-2 py-1.5 text-xs font-normal text-gray-500">
                        {user.signInDetails?.loginId ?? user.username}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(tenantHref(tenant, "/profile"))
                        }
                      >
                        <User size={14} /> Mi perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            tenantHref(tenant, "/profile?tab=pedidos"),
                          )
                        }
                      >
                        <Package size={14} /> Mis pedidos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            tenantHref(tenant, "/profile?tab=favoritos"),
                          )
                        }
                      >
                        <Heart size={14} /> Favoritos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            tenantHref(tenant, "/profile?tab=configuracion"),
                          )
                        }
                      >
                        <Settings size={14} /> Configuración
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => logOut()}
                      >
                        <LogOut size={14} /> Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link
                      href={tenantHref(tenant, "/register")}
                      className="transition-colors hover:text-gray-900"
                    >
                      Registrarse
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                      href={tenantHref(tenant, "/login")}
                      className="transition-colors hover:text-gray-900"
                    >
                      Iniciar sesión
                    </Link>
                  </>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Main navbar */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link
              href={tenantHref(tenant, "/")}
              className="flex shrink-0 items-center gap-1.5"
            >
              <span className="text-xl">🛍️</span>
              <span className="text-sm font-bold tracking-tight text-gray-900">
                ChapaTuVenta
                <span className="text-brand-accent">.com</span>
              </span>
            </Link>

            {/* Search bar */}
            <div ref={searchRef} className="relative hidden flex-1 md:flex">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-1 items-center overflow-hidden rounded-lg border border-gray-200"
              >
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors hover:bg-gray-100"
                >
                  Todas las Categorías
                  <ChevronDown className="size-3.5" />
                </button>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Buscar productos, marcas y más..."
                  className="min-w-0 flex-1 bg-white px-4 py-2.5 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand-accent hover:bg-brand-accent-hover shrink-0 px-5 py-2.5 text-white transition-colors"
                >
                  <Search className="size-4" />
                </button>
              </form>
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={tenantHref(tenant, `/products/${p.id}`)}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-9 w-9 shrink-0 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400">{p.category}</p>
                      </div>
                      <span className="text-brand-accent shrink-0 text-sm font-semibold">
                        ${p.price}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href={tenantHref(
                      tenant,
                      `/catalog?q=${encodeURIComponent(query.trim())}`,
                    )}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-brand-accent block w-full border-t border-gray-100 px-4 py-2.5 text-center text-xs transition-colors hover:bg-gray-50"
                  >
                    Ver todos los resultados para &ldquo;{query}&rdquo;
                  </Link>
                </div>
              )}
            </div>

            {/* Right icons */}
            <div className="ml-auto flex items-center gap-1 md:ml-0">
              {showCart && (
                <button
                  onClick={openSheet}
                  className="relative rounded-lg p-2 transition-colors hover:bg-gray-100"
                  aria-label="Abrir carrito"
                >
                  <ShoppingCart className="size-5" />
                  {totalCount > 0 && (
                    <span className="bg-brand-accent absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none font-bold text-white">
                      {totalCount > 9 ? "9+" : totalCount}
                    </span>
                  )}
                </button>
              )}
              <button className="hidden rounded-lg p-2 transition-colors hover:bg-gray-100 md:flex">
                <Bell className="size-5" />
              </button>
              {/* Mobile hamburger */}
              <button
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menú"
              >
                {isMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="animate-in slide-in-from-top-2 border-b border-gray-100 bg-white duration-200 md:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setIsMenuOpen(false);
              }}
              className="flex items-center overflow-hidden rounded-lg border border-gray-200"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="flex-1 px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-brand-accent px-4 py-2.5 text-white"
              >
                <Search className="size-4" />
              </button>
            </form>
            {["Mitra", "Sobre Nosotros", "Atención", "Promo"].map((label) => (
              <a
                key={label}
                href="#"
                className="hover:text-brand-accent block py-1 text-sm font-medium text-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="border-t border-gray-100 pt-1">
              {!isLoading &&
                (user ? (
                  <div className="space-y-0.5">
                    <p className="truncate px-1 pb-1 text-xs text-gray-400">
                      {user.signInDetails?.loginId ?? user.username}
                    </p>
                    {[
                      {
                        icon: <User size={14} />,
                        label: "Mi perfil",
                        href: tenantHref(tenant, "/profile"),
                      },
                      {
                        icon: <Package size={14} />,
                        label: "Mis pedidos",
                        href: tenantHref(tenant, "/profile?tab=pedidos"),
                      },
                      {
                        icon: <Heart size={14} />,
                        label: "Favoritos",
                        href: tenantHref(tenant, "/profile?tab=favoritos"),
                      },
                      {
                        icon: <Settings size={14} />,
                        label: "Configuración",
                        href: tenantHref(tenant, "/profile?tab=configuracion"),
                      },
                    ].map(({ icon, label, href }) => (
                      <button
                        key={label}
                        onClick={() => {
                          if (href) router.push(href);
                          setIsMenuOpen(false);
                        }}
                        className="hover:text-brand-accent flex w-full items-center gap-2 px-1 py-1.5 text-sm text-gray-700 transition-colors"
                      >
                        {icon} {label}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        logOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-1 py-1.5 text-sm text-red-500 transition-colors hover:text-red-600"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      href={tenantHref(tenant, "/register")}
                      className="text-brand-accent text-sm font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                    {showLogin && (
                      <Link
                        href={tenantHref(tenant, "/login")}
                        className="text-sm font-medium text-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Iniciar sesión
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
