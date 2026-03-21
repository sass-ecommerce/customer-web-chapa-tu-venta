"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({ tenant }: { tenant: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-dark" htmlFor="email">
            Correo electrónico
          </label>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-brand-dark" htmlFor="password">
              Contraseña
            </label>
            <Link
              href={`/${tenant}/forgot-password`}
              className="text-xs text-brand-accent hover:underline underline-offset-2"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2.5 text-sm mt-2"
          size="lg"
        >
          Iniciar sesión
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <span className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">o</span>
        <span className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-gray-500">
        ¿No tienes cuenta?{" "}
        <Link
          href={`/${tenant}/register`}
          className="text-brand-accent font-semibold hover:underline underline-offset-2"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
