"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { signIn } from "aws-amplify/auth";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CognitoErrorDialog, {
  parseCognitoError,
  type CognitoErrorInfo,
} from "@/components/auth/cognito-error-dialog";
import { useAuth } from "@/lib/auth/auth-context";
import { tenantHref } from "@/lib/utils/tenant-href";

export default function LoginForm({ tenant }: { tenant: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorInfo, setErrorInfo] = useState<CognitoErrorInfo | null>(null);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        await signIn({ username: value.email, password: value.password });
        await refreshUser();
        const next = searchParams.get("next");
        router.push(next ?? tenantHref(tenant, "/"));
      } catch (err: unknown) {
        setErrorInfo(parseCognitoError(err));
      }
    },
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <CognitoErrorDialog
        errorInfo={errorInfo}
        onClose={() => setErrorInfo(null)}
      />

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "El correo es requerido."
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? "Correo inválido."
                  : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-1.5">
              <label
                className="text-brand-dark text-sm font-medium"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                autoComplete="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              !value ? "La contraseña es requerida." : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-brand-dark text-sm font-medium"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <Link
                  href={tenantHref(tenant, "/forgot-password")}
                  className="text-brand-accent text-xs underline-offset-2 hover:underline"
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
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              className="bg-brand-accent hover:bg-brand-accent-hover mt-2 w-full py-2.5 text-sm font-semibold text-white"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-100" />
        <span className="text-xs text-gray-400">o</span>
        <span className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-gray-500">
        ¿No tienes cuenta?{" "}
        <Link
          href={tenantHref(tenant, "/register")}
          className="text-brand-accent font-semibold underline-offset-2 hover:underline"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
