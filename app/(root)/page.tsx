import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ─────────────────────────────────────────────
   Landing page SaaS — Chapa Tu Venta
   Aesthetic: editorial bold — cream + red + ink
───────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-body text-brand-dark overflow-x-hidden">
      <MarketingNav />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <Pricing />
      <CtaBanner />
      <MarketingFooter />
    </div>
  );
}

/* ── 1. NAV ──────────────────────────────── */
function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-black/8">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl leading-none">🛍️</span>
          <span className="font-display text-lg font-bold tracking-tight text-brand-dark">
            Chapa<span className="text-brand-accent">Tu</span>Venta
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            ["Características", "#features"],
            ["Precios", "#pricing"],
            ["Demo", "/demo"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#pricing"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold transition-colors"
        >
          Empieza gratis →
        </Link>

        {/* Mobile CTA */}
        <Link
          href="#pricing"
          className="md:hidden inline-flex items-center px-4 py-2 rounded-lg bg-brand-accent text-white text-sm font-semibold"
        >
          Gratis →
        </Link>
      </div>
    </header>
  );
}

/* ── 2. HERO ─────────────────────────────── */
function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full bg-brand-accent/6 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"
      />

      <div className="relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="space-y-7">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold tracking-wide uppercase">
            ✦ Plataforma SaaS de e-commerce
          </span>

          <h1 className="font-display text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-brand-dark">
            Tu tienda online,{" "}
            <em className="not-italic text-brand-accent">lista en minutos.</em>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-md">
            Crea, personaliza y escala tu negocio digital sin código. Cada marca
            recibe su propio subdominio, catálogo y panel de control.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-base transition-colors shadow-lg shadow-brand-accent/25"
            >
              Empieza gratis
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-black/15 bg-white hover:bg-gray-50 text-brand-dark font-semibold text-base transition-colors"
            >
              Ver demo →
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex -space-x-2">
              {["🧑‍💼", "👩‍💻", "🧑‍🍳", "👩‍🎨"].map((e, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-base leading-none"
                >
                  {e}
                </div>
              ))}
            </div>
            <span>
              Más de{" "}
              <strong className="text-brand-dark font-semibold">2,400</strong>{" "}
              tiendas activas
            </span>
          </div>
        </div>

        {/* Right: mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <StoreMockup />
        </div>
      </div>
    </section>
  );
}

function StoreMockup() {
  const products = [
    { name: "Zapatillas Air", price: "$89", badge: "🔥 Top", color: "bg-orange-50" },
    { name: "Mochila Urban", price: "$54", badge: "Nuevo", color: "bg-blue-50" },
    { name: "Gorra Vintage", price: "$32", badge: "−20%", color: "bg-green-50" },
    { name: "Lentes Retro", price: "$45", badge: "Popular", color: "bg-purple-50" },
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* Browser chrome */}
      <div className="rounded-2xl border border-black/10 shadow-2xl shadow-black/12 bg-white overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-black/8">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3 rounded-md bg-white border border-black/10 px-3 py-1.5 text-xs text-gray-400 font-mono">
            demo.chapa-tu-venta.com
          </div>
        </div>

        {/* Store nav */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/6">
          <span className="text-sm font-bold text-brand-dark">🛍️ DemoStore</span>
          <div className="flex items-center gap-3">
            <div className="h-2 w-16 rounded bg-gray-100" />
            <div className="w-7 h-7 rounded-lg bg-brand-accent flex items-center justify-center text-white text-xs">
              3
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {products.map((p) => (
            <div
              key={p.name}
              className={`${p.color} rounded-xl p-3 space-y-2 border border-black/5`}
            >
              <div className="h-16 rounded-lg bg-white/70 flex items-center justify-center text-2xl">
                🛒
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-700 leading-tight">
                    {p.name}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent font-semibold">
                    {p.badge}
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-dark">{p.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="px-4 py-3 bg-brand-dark flex items-center justify-between">
          <span className="text-white/60 text-xs">Powered by ChapaTuVenta</span>
          <span className="text-brand-accent text-xs font-semibold">Ver todo →</span>
        </div>
      </div>

      {/* Floating stat badge */}
      <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg shadow-black/10 border border-black/8 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-lg">
          📈
        </div>
        <div>
          <div className="text-xs text-gray-400">Ventas hoy</div>
          <div className="text-base font-bold text-brand-dark">+$1,240</div>
        </div>
      </div>

      {/* Floating order badge */}
      <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg shadow-black/10 border border-black/8 px-4 py-3 flex items-center gap-2">
        <span className="text-lg">🎉</span>
        <div>
          <div className="text-xs text-gray-400">Nuevo pedido</div>
          <div className="text-xs font-semibold text-brand-dark">Zapatillas Air ×1</div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. LOGO BAR ─────────────────────────── */
function LogoBar() {
  const brands = ["Modanova", "TechShop", "FreshMart", "ArtesanCo", "SportZone"];

  return (
    <section className="border-y border-black/8 bg-white py-10">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-7">
          Confían en nosotros
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-lg font-bold text-gray-200 hover:text-gray-300 transition-colors cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. FEATURES ─────────────────────────── */
function Features() {
  const features = [
    {
      icon: "🏪",
      title: "Catálogo inteligente",
      description:
        "Gestiona miles de productos con filtros avanzados, búsqueda instantánea y variantes de talla, color y más.",
    },
    {
      icon: "🌐",
      title: "Multi-tenant nativo",
      description:
        "Cada negocio recibe su propio subdominio personalizado, aislado y con identidad de marca propia.",
    },
    {
      icon: "📊",
      title: "Analytics en tiempo real",
      description:
        "Métricas de ventas, visitas y conversión actualizadas al instante. Toma decisiones con datos reales.",
    },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
          ✦ Características
        </span>
        <h2 className="font-display text-4xl font-bold text-brand-dark">
          Todo lo que necesitas, sin complicaciones
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Card
            key={f.title}
            className="border-black/8 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-brand-accent/8 flex items-center justify-center text-2xl mb-3">
                {f.icon}
              </div>
              <CardTitle className="text-lg font-bold text-brand-dark">
                {f.title}
              </CardTitle>
              <CardDescription className="text-gray-500 leading-relaxed">
                {f.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ── 5. HOW IT WORKS ─────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Crea tu cuenta",
      desc: "Regístrate gratis en segundos. Sin tarjeta de crédito.",
    },
    {
      n: "02",
      title: "Personaliza tu tienda",
      desc: "Sube tu logo, configura colores y agrega tus primeros productos.",
    },
    {
      n: "03",
      title: "Empieza a vender",
      desc: "Comparte tu enlace, recibe pedidos y cobra en línea desde el día uno.",
    },
  ];

  return (
    <section className="bg-brand-bg py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
            ✦ Cómo funciona
          </span>
          <h2 className="font-display text-4xl font-bold text-brand-dark">
            Tres pasos para lanzar tu tienda
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-8 left-[calc(16.7%+16px)] right-[calc(16.7%+16px)] h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"
          />

          {steps.map((s) => (
            <div key={s.n} className="relative text-center space-y-4">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-white border-2 border-brand-accent/20 items-center justify-center mx-auto shadow-sm">
                <span className="font-display text-xl font-bold text-brand-accent">
                  {s.n}
                </span>
              </div>
              <h3 className="text-lg font-bold text-brand-dark">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. PRICING ──────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
          ✦ Precios
        </span>
        <h2 className="font-display text-4xl font-bold text-brand-dark">
          Planes pensados para crecer
        </h2>
        <p className="mt-3 text-gray-500">Sin sorpresas. Cancela cuando quieras.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Plan Gratis */}
        <Card className="border-black/10 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-brand-dark">Gratis</CardTitle>
            <div className="flex items-end gap-1 mt-2">
              <span className="font-display text-5xl font-bold text-brand-dark">$0</span>
              <span className="text-gray-400 mb-2">/mes</span>
            </div>
            <CardDescription>Perfecto para empezar a explorar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "50 productos",
              "1 dominio incluido",
              "Panel de control básico",
              "Soporte por email",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                <span className="text-green-500 font-bold shrink-0">✓</span>
                {item}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="#"
                className="block w-full text-center py-3 rounded-xl border border-black/15 bg-gray-50 hover:bg-gray-100 text-brand-dark font-semibold text-sm transition-colors"
              >
                Empezar gratis
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Plan Pro */}
        <Card className="border-2 border-brand-accent bg-white relative overflow-visible">
          {/* Popular badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-accent text-white text-xs font-bold tracking-wide">
            Más popular
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-brand-dark">Pro</CardTitle>
            <div className="flex items-end gap-1 mt-2">
              <span className="font-display text-5xl font-bold text-brand-dark">$29</span>
              <span className="text-gray-400 mb-2">/mes</span>
            </div>
            <CardDescription>Para negocios que quieren escalar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Productos ilimitados",
              "Dominio propio incluido",
              "Analytics avanzado",
              "Soporte prioritario 24/7",
              "Integraciones de pago",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                <span className="text-brand-accent font-bold shrink-0">✓</span>
                {item}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="#"
                className="block w-full text-center py-3 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-accent/25"
              >
                Empezar con Pro
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ── 7. CTA BANNER ───────────────────────── */
function CtaBanner() {
  return (
    <section className="bg-brand-dark py-20">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
          ¿Listo para vender online?
        </h2>
        <p className="text-white/60 text-lg">
          Únete a miles de emprendedores que ya confían en Chapa Tu Venta para
          hacer crecer su negocio digital.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-base transition-colors shadow-xl shadow-brand-accent/30"
          >
            Empieza gratis hoy →
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/8 font-semibold text-base transition-colors"
          >
            Ver tienda demo
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 8. FOOTER ───────────────────────────── */
function MarketingFooter() {
  const links: Record<string, string[]> = {
    Producto: ["Características", "Precios", "Demo", "Changelog"],
    Empresa: ["Sobre nosotros", "Blog", "Trabaja con nosotros"],
    Legal: ["Privacidad", "Términos", "Cookies"],
  };

  return (
    <footer className="bg-white border-t border-black/8">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="font-display text-base font-bold text-brand-dark">
                Chapa<span className="text-brand-accent">Tu</span>Venta
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
              La plataforma más rápida para lanzar tu tienda online.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 hover:text-brand-dark transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-black/8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2026 Chapa Tu Venta. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-300">Hecho con ❤️ para emprendedores latam</p>
        </div>
      </div>
    </footer>
  );
}
