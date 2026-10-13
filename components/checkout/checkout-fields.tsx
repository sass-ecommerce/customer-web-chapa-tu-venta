"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";

export function Field({
  label,
  error,
  children,
  optional,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
        {optional && (
          <span className="ml-1 text-xs font-normal text-gray-400">
            (opcional)
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function RadioCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-all",
        selected
          ? "border-brand-accent bg-red-50/50"
          : "border-gray-200 bg-white hover:border-gray-300",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-brand-accent" : "border-gray-300",
        )}
      >
        {selected && <div className="bg-brand-accent size-2.5 rounded-full" />}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-brand-dark text-sm font-semibold">{title}</span>
        </div>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
}

export function TextInput({
  label,
  optional,
  error,
  value,
  onChange,
  onBlur,
  type,
  placeholder,
  maxLength,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <Field label={label} error={error} optional={optional}>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        className={cn(
          "h-11 rounded-xl px-4 text-sm",
          error && "border-red-400 focus-visible:border-red-400",
        )}
      />
    </Field>
  );
}

/** Back / continue buttons rendered at the bottom of every step form. */
export function StepActions({
  onBack,
  submitLabel = "Siguiente",
  isSubmitting,
}: {
  onBack?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}) {
  return (
    <div className="flex gap-3">
      {onBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-xl border-gray-200 px-5 text-gray-600 hover:bg-gray-50"
        >
          <ChevronLeft className="mr-1 size-4" />
          Anterior
        </Button>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand-accent hover:bg-brand-accent-hover h-12 flex-1 rounded-xl border-0 text-base font-semibold text-white"
      >
        {submitLabel}
      </Button>
    </div>
  );
}
