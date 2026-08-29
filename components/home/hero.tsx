import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tenantHref } from "@/lib/utils/tenant-href";
import { DEFAULT_HERO, type HeroConfig } from "@/lib/config/tenants";

export function Hero({ tenant, hero }: { tenant: string; hero?: HeroConfig }) {
  const h = hero ?? DEFAULT_HERO;

  return (
    /* top-[100px] = top bar (36px h-9) + main navbar (64px h-16) */
    <section className="bg-[#F5F6F7] pt-[100px] pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[460px] flex-col overflow-hidden rounded-2xl bg-[#1A1A1A] lg:flex-row">
          {/* Left — text */}
          <div className="relative z-10 flex flex-1 flex-col justify-center space-y-6 px-8 py-12 lg:px-14">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#EF4444]/25 bg-[#EF4444]/15 px-3 py-1.5 text-[11px] font-bold text-[#EF4444] opacity-0"
              style={{
                animation:
                  "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.05s",
              }}
            >
              🔥 OFERTA LIMITADA
            </span>

            <div
              className="opacity-0"
              style={{
                animation:
                  "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.15s",
              }}
            >
              <h1 className="font-display text-5xl leading-[1.05] tracking-tight whitespace-pre-line text-white italic lg:text-6xl xl:text-[4.5rem]">
                {h.heading}
              </h1>
              {h.discountLabel && (
                <p className="font-body mt-3 text-2xl font-black tracking-tight text-[#EF4444] lg:text-3xl">
                  {h.discountLabel}
                </p>
              )}
            </div>

            <p
              className="max-w-[260px] text-sm leading-relaxed text-white/45 opacity-0"
              style={{
                animation:
                  "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.25s",
              }}
            >
              {h.description}
            </p>

            <div
              className="flex flex-wrap gap-3 opacity-0"
              style={{
                animation:
                  "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.35s",
              }}
            >
              <Button
                asChild
                className="h-11 rounded-full border-0 bg-[#EF4444] px-7 font-semibold text-white hover:bg-[#dc2626]"
              >
                <Link href={tenantHref(tenant, "/catalog")}>
                  {h.ctaPrimaryLabel}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/20 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={tenantHref(tenant, "/catalog")}>Ver catálogo</Link>
              </Button>
            </div>

            {/* Stats */}
            {h.stats && h.stats.length > 0 && (
              <div
                className="flex items-center gap-6 pt-1 opacity-0"
                style={{
                  animation:
                    "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.45s",
                }}
              >
                {h.stats.map(({ value, label }, i) => (
                  <div key={label} className="flex items-center gap-6">
                    <div>
                      <p className="text-base leading-none font-black text-white">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[10px] tracking-wide text-white/35 uppercase">
                        {label}
                      </p>
                    </div>
                    {i < h.stats!.length - 1 && (
                      <div className="h-6 w-px bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — hero image */}
          <div className="relative min-h-[280px] w-full overflow-hidden lg:w-[45%]">
            <img
              src={h.image}
              alt="Hero"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* Blend into dark bg — desktop left edge */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent lg:block" />
            {/* Blend into dark bg — mobile top edge */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent lg:hidden" />

            {/* Circular discount badge — only if discountBadge is set */}
            {h.discountBadge && (
              <div className="absolute top-6 right-6 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#EF4444] shadow-lg shadow-black/40">
                <span className="text-[9px] leading-none font-bold text-white uppercase">
                  Hasta
                </span>
                <span className="text-lg leading-none font-black text-white">
                  {h.discountBadge}
                </span>
                <span className="text-[9px] leading-none font-bold text-white uppercase">
                  off
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}
