"use client";

import { useState } from "react";
import Link from "next/link";
import { tenantHref } from "@/lib/tenant-href";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import CognitoErrorDialog, {
  parseCognitoError,
  type CognitoErrorInfo,
} from "@/components/auth/cognito-error-dialog";

export default function RegisterForm({ tenant }: { tenant: string }) {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "confirm">("register");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorInfo, setErrorInfo] = useState<CognitoErrorInfo | null>(null);

  const registerForm = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    onSubmit: async ({ value }) => {
      try {
        const { nextStep } = await signUp({
          username: value.email,
          password: value.password,
          options: {
            userAttributes: {
              email: value.email,
              name: value.name,
              "custom:tenant": tenant,
            },
          },
        });
        if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
          setRegisteredEmail(value.email);
          setStep("confirm");
        }
      } catch (err: unknown) {
        setErrorInfo(parseCognitoError(err));
      }
    },
  });

  const confirmForm = useForm({
    defaultValues: { code: "" },
    onSubmit: async ({ value }) => {
      try {
        await confirmSignUp({ username: registeredEmail, confirmationCode: value.code });
        router.push(`/${tenant}/login`);
      } catch (err: unknown) {
        setErrorInfo(parseCognitoError(err));
      }
    },
  });

  if (step === "confirm") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <CognitoErrorDialog errorInfo={errorInfo} onClose={() => setErrorInfo(null)} />

        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); confirmForm.handleSubmit(); }}
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-brand-dark">Confirma tu correo</h2>
            <p className="text-sm text-gray-500">
              Ingresa el código que enviamos a{" "}
              <span className="font-medium">{registeredEmail}</span>.
            </p>
          </div>

          <confirmForm.Field
            name="code"
            validators={{ onChange: ({ value }) => !value ? "El código es requerido." : undefined }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-brand-dark" htmlFor="confirm-code">
                  Código de verificación
                </label>
                <Input
                  id="confirm-code"
                  type="text"
                  placeholder="000000"
                  autoComplete="one-time-code"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                )}
              </div>
            )}
          </confirmForm.Field>

          <confirmForm.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2.5 text-sm mt-2"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verificando..." : "Verificar cuenta"}
              </Button>
            )}
          </confirmForm.Subscribe>

          <button
            type="button"
            onClick={() => { setStep("register"); setErrorInfo(null); }}
            className="w-full text-sm text-gray-500 hover:text-brand-accent transition-colors"
          >
            Volver al registro
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <CognitoErrorDialog errorInfo={errorInfo} onClose={() => setErrorInfo(null)} />

      <form
        className="space-y-4"
        onSubmit={(e) => { e.preventDefault(); registerForm.handleSubmit(); }}
      >
        {/* Full name */}
        <registerForm.Field
          name="name"
          validators={{ onChange: ({ value }) => !value.trim() ? "El nombre es requerido." : undefined }}
        >
          {(field) => (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-dark" htmlFor="full-name">
                Nombre completo
              </label>
              <Input
                id="full-name"
                type="text"
                placeholder="Tu nombre"
                autoComplete="name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
              )}
            </div>
          )}
        </registerForm.Field>

        {/* Email */}
        <registerForm.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              !value ? "El correo es requerido." :
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Correo inválido." : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-dark" htmlFor="email">
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
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
              )}
            </div>
          )}
        </registerForm.Field>

        {/* Password */}
        <registerForm.Field
          name="password"
          validators={{ onChange: ({ value }) => value.length < 8 ? "Mínimo 8 caracteres." : undefined }}
        >
          {(field) => (
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
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
              )}
            </div>
          )}
        </registerForm.Field>

        {/* Confirm password */}
        <registerForm.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value, fieldApi }) =>
              value !== fieldApi.form.getFieldValue("password")
                ? "Las contraseñas no coinciden."
                : undefined,
          }}
        >
          {(field) => (
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
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
              )}
            </div>
          )}
        </registerForm.Field>

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
        <registerForm.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2.5 text-sm mt-2"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          )}
        </registerForm.Subscribe>
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
          href={tenantHref(tenant, "/login")}
          className="text-brand-accent font-semibold hover:underline underline-offset-2"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
