"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm({ tenant }: { tenant: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Full name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-dark" htmlFor="full-name">
            Nombre completo
          </label>
          <Input
            id="full-name"
            type="text"
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </div>

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
          <label className="text-sm font-medium text-brand-dark" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
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

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-dark" htmlFor="confirm-password">
            Confirmar contraseña
          </label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repite tu contraseña"
              autoComplete="new-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-400 leading-relaxed">
          Al registrarte aceptas nuestros{" "}
          <Link href="#" className="text-brand-accent hover:underline underline-offset-2">
            Términos de uso
          </Link>{" "}
          y{" "}
          <Link href="#" className="text-brand-accent hover:underline underline-offset-2">
            Política de privacidad
          </Link>
          .
        </p>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2.5 text-sm mt-2"
          size="lg"
        >
          Crear cuenta
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <span className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">o</span>
        <span className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?{" "}
        <Link
          href={`/${tenant}/login`}
          className="text-brand-accent font-semibold hover:underline underline-offset-2"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
