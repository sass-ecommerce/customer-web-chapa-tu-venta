"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook, Youtube, Send } from "lucide-react";

const footerLinks = {
  marca: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Prensa", href: "#" },
  ],
  comprar: [
    { label: "Todos los Productos", href: "#" },
    { label: "Flash Sale", href: "#offers" },
    { label: "Categorías", href: "#" },
    { label: "Nuevos Ingresos", href: "#" },
  ],
  vender: [
    { label: "Vende en ChapaTuVenta", href: "#" },
    { label: "Centro de Vendedores", href: "#" },
    { label: "Programa Mitra", href: "#" },
    { label: "Guía de Vendedor", href: "#" },
  ],
  ayuda: [
    { label: "Centro de Ayuda", href: "#" },
    { label: "Rastrear Pedido", href: "#" },
    { label: "Devoluciones", href: "#" },
    { label: "Preguntas Frecuentes", href: "#" },
  ],
};

const socials = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="bg-[#1F2937] text-white">
      {/* Quote strip */}
      <div className="border-y border-white/10 py-5 text-center">
        <p className="text-xl font-light tracking-wide text-white/80 italic">
          &ldquo;¡Comprá Sin Límites!&rdquo;
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main columns */}
        <div className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-5">
          {/* Brand + socials */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <span className="text-sm font-bold">ChapaTuVenta</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Tu destino de compras favorito. Calidad garantizada y envío
              rápido.
            </p>
            <div className="flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:bg-brand-accent flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Marca */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
              Marca
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.marca.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprar */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
              Comprar
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.comprar.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vender */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
              Vender
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.vender.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guía & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Guía y Ayuda
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.ayuda.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-widest text-white/40 uppercase">
                Newsletter
              </h3>
              <p className="mb-3 text-xs text-white/40">
                Ofertas exclusivas antes que nadie.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 border-white/20 bg-white/10 text-sm text-white placeholder:text-white/30"
                />
                <Button
                  size="icon"
                  className="bg-brand-accent hover:bg-brand-accent-hover h-8 w-8 shrink-0 rounded-lg border-0 text-white"
                  aria-label="Suscribirse"
                >
                  <Send className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm">🛍️</span>
            <p className="text-xs text-white/40">
              © 2026 ChapaTuVenta. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
