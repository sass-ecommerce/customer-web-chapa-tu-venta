import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tenantHref } from "@/lib/utils/tenant-href";
import type { PromoBanner as PromoBannerType } from "@/lib/config/tenants";

export function PromoBanner({
  banner,
  tenant,
}: {
  banner: PromoBannerType;
  tenant: string;
}) {
  return (
    <section className="bg-[#F5F6F7] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-[180px] overflow-hidden rounded-2xl sm:h-[200px]">
          {/* Background image */}
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative flex h-full max-w-lg flex-col justify-center space-y-3 px-8 sm:px-10">
            {banner.badge && (
              <span className="bg-brand-accent inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                {banner.badge}
              </span>
            )}
            <h2 className="text-xl leading-tight font-black text-white sm:text-2xl">
              {banner.title}
            </h2>
            <p className="text-xs leading-snug text-white/70 sm:text-sm">
              {banner.description}
            </p>
            <Button
              asChild
              className="w-fit rounded-full border-0 bg-white px-5 text-xs font-semibold text-gray-900 hover:bg-gray-100"
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
