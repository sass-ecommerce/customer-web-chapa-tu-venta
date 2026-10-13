"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/utils";

const STEPS = [
  { n: 1, label: "Tus datos" },
  { n: 2, label: "Entrega" },
  { n: 3, label: "Pago" },
];

export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.n}>
          {i > 0 && (
            <div
              className={cn(
                "mx-2 h-px flex-1 transition-colors",
                step > i ? "bg-brand-accent" : "bg-gray-200",
              )}
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-all",
                step > s.n
                  ? "bg-brand-accent text-white"
                  : step === s.n
                    ? "bg-brand-accent ring-brand-accent/15 text-white ring-4"
                    : "bg-gray-100 text-gray-400",
              )}
            >
              {step > s.n ? <Check className="size-4" /> : s.n}
            </div>
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap",
                step >= s.n ? "text-brand-dark" : "text-gray-400",
              )}
            >
              {s.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
