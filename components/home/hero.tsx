import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tenantHref } from "@/lib/utils/tenant-href";
import { DEFAULT_HERO, type HeroConfig } from "@/lib/config/tenants";

export function Hero({ tenant, hero }: { tenant: string; hero?: HeroConfig }) {
  const h = hero ?? DEFAULT_HERO;

  return (
    /* top-[100px] = top bar (36px h-9) + main navbar (64px h-16) */
    <section className="pt-[100px] bg-[#F5F6F7] pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] min-h-[460px] flex flex-col lg:flex-row">
          {/* Left — text */}
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-14 py-12 space-y-6 relative z-10">
            <span
              className="inline-flex items-center gap-2 bg-[#EF4444]/15 text-[#EF4444] text-[11px] font-bold px-3 py-1.5 rounded-full w-fit border border-[#EF4444]/25 opacity-0"
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
              <h1 className="font-display italic text-5xl lg:text-6xl xl:text-[4.5rem] text-white leading-[1.05] tracking-tight whitespace-pre-line">
                {h.heading}
              </h1>
              {h.discountLabel && (
                <p className="text-[#EF4444] font-black text-2xl lg:text-3xl font-body mt-3 tracking-tight">
                  {h.discountLabel}
                </p>
              )}
            </div>

            <p
              className="text-white/45 text-sm leading-relaxed max-w-[260px] opacity-0"
              style={{
                animation:
                  "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.25s",
              }}
            >
              {h.description}
            </p>

            <div
              className="flex gap-3 flex-wrap opacity-0"
              style={{
                animation:
                  "heroUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards 0.35s",
              }}
            >
              <Button
                asChild
                className="bg-[#EF4444] hover:bg-[#dc2626] text-white font-semibold rounded-full border-0 px-7 h-11"
              >
                <Link href={tenantHref(tenant, "/catalog")}>
                  {h.ctaPrimaryLabel}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-7 font-semibold h-11 border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
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
                      <p className="text-white font-black text-base leading-none">
                        {value}
                      </p>
                      <p className="text-white/35 text-[10px] mt-0.5 uppercase tracking-wide">
                        {label}
                      </p>
                    </div>
                    {i < h.stats!.length - 1 && (
                      <div className="w-px h-6 bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — hero image */}
          <div className="relative w-full lg:w-[45%] min-h-[280px] overflow-hidden">
            <img
              src={h.image}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Blend into dark bg — desktop left edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent hidden lg:block" />
            {/* Blend into dark bg — mobile top edge */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent lg:hidden" />

            {/* Circular discount badge — only if discountBadge is set */}
            {h.discountBadge && (
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[#EF4444] flex flex-col items-center justify-center shadow-lg shadow-black/40">
                <span className="text-[9px] text-white font-bold leading-none uppercase">
                  Hasta
                </span>
                <span className="text-lg text-white font-black leading-none">
                  {h.discountBadge}
                </span>
                <span className="text-[9px] text-white font-bold leading-none uppercase">
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
