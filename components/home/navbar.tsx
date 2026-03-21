"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Bell, ChevronDown, Menu, X } from "lucide-react";

export function Navbar({ tenant }: { tenant: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = 3;

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
            <Link
              href={`/${tenant}/register`}
              className="hover:text-gray-900 transition-colors"
            >
              Registrarse
            </Link>
            <span className="text-gray-300">|</span>
            <a
              href={`/${tenant}/login`}
              className="hover:text-gray-900 transition-colors"
            >
              Iniciar sesión
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link
              href={`/${tenant}`}
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
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {cartCount}
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
            <div className="flex gap-4 pt-1 border-t border-gray-100">
              <Link
                href={`/${tenant}/register`}
                className="text-sm font-semibold text-brand-accent"
              >
                Registrarse
              </Link>
              <a href="#" className="text-sm font-medium text-gray-600">
                Iniciar sesión
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
