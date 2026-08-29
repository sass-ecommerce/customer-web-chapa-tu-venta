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
    <div className="font-body text-brand-dark min-h-screen overflow-x-hidden bg-[#FAFAF8]">
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
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#FAFAF8]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl leading-none">🛍️</span>
          <span className="font-display text-brand-dark text-lg font-bold tracking-tight">
            Chapa<span className="text-brand-accent">Tu</span>Venta
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Características", "#features"],
            ["Precios", "#pricing"],
            ["Demo", "/demo"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="hover:text-brand-dark text-sm font-medium text-gray-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#pricing"
          className="bg-brand-accent hover:bg-brand-accent-hover hidden items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors md:inline-flex"
        >
          Empieza gratis →
        </Link>

        {/* Mobile CTA */}
        <Link
          href="#pricing"
          className="bg-brand-accent inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white md:hidden"
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
    <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="bg-brand-accent/6 pointer-events-none absolute top-0 right-0 h-[560px] w-[560px] translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="space-y-7">
          {/* Badge */}
          <span className="bg-brand-accent/10 border-brand-accent/20 text-brand-accent inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
            ✦ Plataforma SaaS de e-commerce
          </span>

          <h1 className="font-display text-brand-dark text-5xl leading-[1.08] font-bold tracking-tight lg:text-6xl">
            Tu tienda online,{" "}
            <em className="text-brand-accent not-italic">lista en minutos.</em>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-gray-500">
            Crea, personaliza y escala tu negocio digital sin código. Cada marca
            recibe su propio subdominio, catálogo y panel de control.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#pricing"
              className="bg-brand-accent hover:bg-brand-accent-hover shadow-brand-accent/25 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-colors"
            >
              Empieza gratis
            </Link>
            <Link
              href="/demo"
              className="text-brand-dark inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-7 py-3.5 text-base font-semibold transition-colors hover:bg-gray-50"
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
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-base leading-none"
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
    {
      name: "Zapatillas Air",
      price: "$89",
      badge: "🔥 Top",
      color: "bg-orange-50",
    },
    {
      name: "Mochila Urban",
      price: "$54",
      badge: "Nuevo",
      color: "bg-blue-50",
    },
    {
      name: "Gorra Vintage",
      price: "$32",
      badge: "−20%",
      color: "bg-green-50",
    },
    {
      name: "Lentes Retro",
      price: "$45",
      badge: "Popular",
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* Browser chrome */}
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/12">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-black/8 bg-gray-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="mx-3 flex-1 rounded-md border border-black/10 bg-white px-3 py-1.5 font-mono text-xs text-gray-400">
            demo.chapa-tu-venta.com
          </div>
        </div>

        {/* Store nav */}
        <div className="flex items-center justify-between border-b border-black/6 px-4 py-3">
          <span className="text-brand-dark text-sm font-bold">
            🛍️ DemoStore
          </span>
          <div className="flex items-center gap-3">
            <div className="h-2 w-16 rounded bg-gray-100" />
            <div className="bg-brand-accent flex h-7 w-7 items-center justify-center rounded-lg text-xs text-white">
              3
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {products.map((p) => (
            <div
              key={p.name}
              className={`${p.color} space-y-2 rounded-xl border border-black/5 p-3`}
            >
              <div className="flex h-16 items-center justify-center rounded-lg bg-white/70 text-2xl">
                🛒
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] leading-tight font-semibold text-gray-700">
                    {p.name}
                  </span>
                  <span className="bg-brand-accent/10 text-brand-accent rounded-full px-1.5 py-0.5 text-[9px] font-semibold">
                    {p.badge}
                  </span>
                </div>
                <span className="text-brand-dark text-sm font-bold">
                  {p.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="bg-brand-dark flex items-center justify-between px-4 py-3">
          <span className="text-xs text-white/60">Powered by ChapaTuVenta</span>
          <span className="text-brand-accent text-xs font-semibold">
            Ver todo →
          </span>
        </div>
      </div>

      {/* Floating stat badge */}
      <div className="absolute -bottom-4 -left-6 flex items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-3 shadow-lg shadow-black/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-lg">
          📈
        </div>
        <div>
          <div className="text-xs text-gray-400">Ventas hoy</div>
          <div className="text-brand-dark text-base font-bold">+$1,240</div>
        </div>
      </div>

      {/* Floating order badge */}
      <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-3 shadow-lg shadow-black/10">
        <span className="text-lg">🎉</span>
        <div>
          <div className="text-xs text-gray-400">Nuevo pedido</div>
          <div className="text-brand-dark text-xs font-semibold">
            Zapatillas Air ×1
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. LOGO BAR ─────────────────────────── */
function LogoBar() {
  const brands = [
    "Modanova",
    "TechShop",
    "FreshMart",
    "ArtesanCo",
    "SportZone",
  ];

  return (
    <section className="border-y border-black/8 bg-white py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-7 text-center text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Confían en nosotros
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display cursor-default text-lg font-bold text-gray-200 transition-colors select-none hover:text-gray-300"
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
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <span className="text-brand-accent mb-3 inline-block text-xs font-semibold tracking-widest uppercase">
          ✦ Características
        </span>
        <h2 className="font-display text-brand-dark text-4xl font-bold">
          Todo lo que necesitas, sin complicaciones
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <Card
            key={f.title}
            className="border-black/8 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <CardHeader>
              <div className="bg-brand-accent/8 mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                {f.icon}
              </div>
              <CardTitle className="text-brand-dark text-lg font-bold">
                {f.title}
              </CardTitle>
              <CardDescription className="leading-relaxed text-gray-500">
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
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <span className="text-brand-accent mb-3 inline-block text-xs font-semibold tracking-widest uppercase">
            ✦ Cómo funciona
          </span>
          <h2 className="font-display text-brand-dark text-4xl font-bold">
            Tres pasos para lanzar tu tienda
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="via-brand-accent/30 absolute top-8 right-[calc(16.7%+16px)] left-[calc(16.7%+16px)] hidden h-px bg-gradient-to-r from-transparent to-transparent md:block"
          />

          {steps.map((s) => (
            <div key={s.n} className="relative space-y-4 text-center">
              <div className="border-brand-accent/20 mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-white shadow-sm">
                <span className="font-display text-brand-accent text-xl font-bold">
                  {s.n}
                </span>
              </div>
              <h3 className="text-brand-dark text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
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
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-14 text-center">
        <span className="text-brand-accent mb-3 inline-block text-xs font-semibold tracking-widest uppercase">
          ✦ Precios
        </span>
        <h2 className="font-display text-brand-dark text-4xl font-bold">
          Planes pensados para crecer
        </h2>
        <p className="mt-3 text-gray-500">
          Sin sorpresas. Cancela cuando quieras.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        {/* Plan Gratis */}
        <Card className="border-black/10 bg-white">
          <CardHeader>
            <CardTitle className="text-brand-dark text-xl font-bold">
              Gratis
            </CardTitle>
            <div className="mt-2 flex items-end gap-1">
              <span className="font-display text-brand-dark text-5xl font-bold">
                $0
              </span>
              <span className="mb-2 text-gray-400">/mes</span>
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
              <div
                key={item}
                className="flex items-center gap-2.5 text-sm text-gray-600"
              >
                <span className="shrink-0 font-bold text-green-500">✓</span>
                {item}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="#"
                className="text-brand-dark block w-full rounded-xl border border-black/15 bg-gray-50 py-3 text-center text-sm font-semibold transition-colors hover:bg-gray-100"
              >
                Empezar gratis
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Plan Pro */}
        <Card className="border-brand-accent relative overflow-visible border-2 bg-white">
          {/* Popular badge */}
          <div className="bg-brand-accent absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-wide text-white">
            Más popular
          </div>
          <CardHeader>
            <CardTitle className="text-brand-dark text-xl font-bold">
              Pro
            </CardTitle>
            <div className="mt-2 flex items-end gap-1">
              <span className="font-display text-brand-dark text-5xl font-bold">
                $29
              </span>
              <span className="mb-2 text-gray-400">/mes</span>
            </div>
            <CardDescription>
              Para negocios que quieren escalar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Productos ilimitados",
              "Dominio propio incluido",
              "Analytics avanzado",
              "Soporte prioritario 24/7",
              "Integraciones de pago",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 text-sm text-gray-600"
              >
                <span className="text-brand-accent shrink-0 font-bold">✓</span>
                {item}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="#"
                className="bg-brand-accent hover:bg-brand-accent-hover shadow-brand-accent/25 block w-full rounded-xl py-3 text-center text-sm font-semibold text-white shadow-lg transition-colors"
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
      <div className="mx-auto max-w-3xl space-y-6 px-6 text-center">
        <h2 className="font-display text-4xl leading-tight font-bold text-white md:text-5xl">
          ¿Listo para vender online?
        </h2>
        <p className="text-lg text-white/60">
          Únete a miles de emprendedores que ya confían en Chapa Tu Venta para
          hacer crecer su negocio digital.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="#pricing"
            className="bg-brand-accent hover:bg-brand-accent-hover shadow-brand-accent/30 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-xl transition-colors"
          >
            Empieza gratis hoy →
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/8"
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
    <footer className="border-t border-black/8 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="font-display text-brand-dark text-base font-bold">
                Chapa<span className="text-brand-accent">Tu</span>Venta
              </span>
            </Link>
            <p className="max-w-[200px] text-sm leading-relaxed text-gray-400">
              La plataforma más rápida para lanzar tu tienda online.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-brand-dark text-sm text-gray-500 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/8 pt-6 md:flex-row">
          <p className="text-xs text-gray-400">
            © 2026 Chapa Tu Venta. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-300">
            Hecho con ❤️ para emprendedores latam
          </p>
        </div>
      </div>
    </footer>
  );
}
