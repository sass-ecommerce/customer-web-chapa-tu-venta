import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tenantHref } from "@/lib/tenant-href";
import type { PromoBanner as PromoBannerType } from "@/lib/tenants";

export function PromoBanner({
  banner,
  tenant,
}: {
  banner: PromoBannerType;
  tenant: string;
}) {
  return (
    <section className="bg-[#F5F6F7] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden h-[180px] sm:h-[200px]">
          {/* Background image */}
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-10 max-w-lg space-y-3">
            {banner.badge && (
              <span className="inline-flex w-fit items-center bg-brand-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {banner.badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {banner.title}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-snug">
              {banner.description}
            </p>
            <Button
              asChild
              className="w-fit bg-white text-gray-900 hover:bg-gray-100 border-0 font-semibold text-xs rounded-full px-5"
            >
              <Link href={tenantHref(tenant, banner.ctaHref)}>
                {banner.ctaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
