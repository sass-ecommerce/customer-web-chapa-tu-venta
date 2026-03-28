import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Tag,
  Clock,
} from "lucide-react";
import type { Benefit } from "@/lib/tenants";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y-2 md:divide-y-0 md:divide-x divide-gray-100">
            {benefits.map(({ icon, title, description }) => {
              const Icon = iconMap[icon];
              return (
                <div
                  key={title}
                  className="flex items-center gap-3 pt-4 md:pt-0 first:pt-0 md:px-4 md:first:pl-0 md:last:pr-0"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <Icon className="size-5 text-brand-accent" />
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
