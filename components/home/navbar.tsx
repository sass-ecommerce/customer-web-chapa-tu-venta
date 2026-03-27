"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Bell, ChevronDown, Menu, X, User, Package, Settings, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCartStore } from "@/lib/cart-store";
import { tenantHref } from "@/lib/tenant-href";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({ tenant }: { tenant: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, logOut } = useAuth();
  const totalCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openSheet = useCartStore((s) => s.openSheet);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <span className="font-medium">📱 Descargar App</span>
          <div className="hidden md:flex items-center gap-6">
            {["Mitra", "Sobre Nosotros", "Atención", "Promo"].map((label) => (
              <a
                key={label}
                href="#"
                className="hover:text-gray-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors focus:outline-none">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-accent text-white">
                        <User size={12} />
                      </span>
                      <span className="font-medium truncate max-w-[120px]">
                        {user.signInDetails?.loginId ?? user.username}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="text-xs font-normal text-gray-500 truncate px-2 py-1.5">
                      {user.signInDetails?.loginId ?? user.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User size={14} /> Mi perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package size={14} /> Mis pedidos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart size={14} /> Favoritos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings size={14} /> Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => logOut()}>
                      <LogOut size={14} /> Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href={tenantHref(tenant, "/register")} className="hover:text-gray-900 transition-colors">
                    Registrarse
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href={tenantHref(tenant, "/login")} className="hover:text-gray-900 transition-colors">
                    Iniciar sesión
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link
              href={tenantHref(tenant, "/")}
              className="flex items-center gap-1.5 shrink-0"
            >
              <span className="text-xl">🛍️</span>
              <span className="text-sm font-bold tracking-tight text-gray-900">
                ChapaTuVenta
                <span className="text-brand-accent">.com</span>
              </span>
            </Link>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 items-center rounded-lg border border-gray-200 overflow-hidden">
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-r border-gray-200 text-xs font-medium whitespace-nowrap hover:bg-gray-100 transition-colors shrink-0">
                Todas las Categorías
                <ChevronDown className="size-3.5" />
              </button>
              <input
                placeholder="Buscar productos, marcas y más..."
                className="flex-1 px-4 py-2.5 text-sm outline-none bg-white min-w-0"
              />
              <button className="px-5 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors shrink-0">
                <Search className="size-4" />
              </button>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              <button
                onClick={openSheet}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Abrir carrito"
              >
                <ShoppingCart className="size-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalCount > 9 ? "9+" : totalCount}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:flex">
                <Bell className="size-5" />
              </button>
              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
              <input
                placeholder="Buscar productos..."
                className="flex-1 px-4 py-2.5 text-sm outline-none"
              />
              <button className="px-4 py-2.5 bg-brand-accent text-white">
                <Search className="size-4" />
              </button>
            </div>
            {["Mitra", "Sobre Nosotros", "Atención", "Promo"].map((label) => (
              <a
                key={label}
                href="#"
                className="block text-sm font-medium text-gray-700 hover:text-brand-accent transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-1 border-t border-gray-100">
              {!isLoading && (
                user ? (
                  <div className="space-y-0.5">
                    <p className="text-xs text-gray-400 px-1 pb-1 truncate">
                      {user.signInDetails?.loginId ?? user.username}
                    </p>
                    {[
                      { icon: <User size={14} />, label: "Mi perfil" },
                      { icon: <Package size={14} />, label: "Mis pedidos" },
                      { icon: <Heart size={14} />, label: "Favoritos" },
                      { icon: <Settings size={14} />, label: "Configuración" },
                    ].map(({ icon, label }) => (
                      <button
                        key={label}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 w-full text-sm text-gray-700 hover:text-brand-accent py-1.5 px-1 transition-colors"
                      >
                        {icon} {label}
                      </button>
                    ))}
                    <button
                      onClick={() => { logOut(); setIsMenuOpen(false); }}
                      className="flex items-center gap-2 w-full text-sm text-red-500 hover:text-red-600 py-1.5 px-1 transition-colors"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      href={tenantHref(tenant, "/register")}
                      className="text-sm font-semibold text-brand-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                    <Link
                      href={tenantHref(tenant, "/login")}
                      className="text-sm font-medium text-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
