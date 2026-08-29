import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Tag,
  Clock,
} from "lucide-react";
import type { Benefit } from "@/lib/config/tenants";

const iconMap = {
  truck: Truck,
  "shield-check": ShieldCheck,
  "rotate-ccw": RotateCcw,
  headphones: Headphones,
  tag: Tag,
  clock: Clock,
};

export function UspBar({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className="bg-[#F5F6F7] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white px-6 py-4">
          <div className="grid grid-cols-2 gap-4 divide-y-2 divide-gray-100 md:grid-cols-4 md:divide-x md:divide-y-0">
            {benefits.map(({ icon, title, description }) => {
              const Icon = iconMap[icon];
              return (
                <div
                  key={title}
                  className="flex items-center gap-3 pt-4 first:pt-0 md:px-4 md:pt-0 md:first:pl-0 md:last:pr-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <Icon className="text-brand-accent size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {title}
                    </p>
                    <p className="text-xs text-gray-400">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
