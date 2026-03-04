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
        <p className="text-xl italic font-light text-white/80 tracking-wide">
          &ldquo;¡Comprá Sin Límites!&rdquo;
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main columns */}
        <div className="py-12 grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand + socials */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <span className="text-sm font-bold">ChapaTuVenta</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Tu destino de compras favorito. Calidad garantizada y envío rápido.
            </p>
            <div className="flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Marca */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white/40">
              Marca
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.marca.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprar */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white/40">
              Comprar
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.comprar.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vender */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white/40">
              Vender
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.vender.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
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
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white/40">
                Guía y Ayuda
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.ayuda.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-white/40">
                Newsletter
              </h3>
              <p className="text-xs text-white/40 mb-3">
                Ofertas exclusivas antes que nadie.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 text-sm h-8"
                />
                <Button
                  size="icon"
                  className="shrink-0 bg-brand-accent hover:bg-brand-accent-hover text-white border-0 rounded-lg h-8 w-8"
                  aria-label="Suscribirse"
                >
                  <Send className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
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
