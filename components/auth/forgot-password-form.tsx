"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CognitoErrorDialog, {
  parseCognitoError,
  type CognitoErrorInfo,
} from "@/components/auth/cognito-error-dialog";
import { tenantHref } from "@/lib/tenant-href";

export default function ForgotPasswordForm({ tenant }: { tenant: string }) {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "confirm">("request");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorInfo, setErrorInfo] = useState<CognitoErrorInfo | null>(null);

  const requestForm = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      try {
        await resetPassword({ username: value.email });
        setSubmittedEmail(value.email);
        setStep("confirm");
      } catch (err: unknown) {
        setErrorInfo(parseCognitoError(err));
      }
    },
  });

  const confirmForm = useForm({
    defaultValues: { code: "", newPassword: "", confirmPassword: "" },
    onSubmit: async ({ value }) => {
      try {
        await confirmResetPassword({
          username: submittedEmail,
          confirmationCode: value.code,
          newPassword: value.newPassword,
        });
        router.push(tenantHref(tenant, "/login"));
      } catch (err: unknown) {
        setErrorInfo(parseCognitoError(err));
      }
    },
  });

  if (step === "confirm") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <CognitoErrorDialog
          errorInfo={errorInfo}
          onClose={() => setErrorInfo(null)}
        />

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            confirmForm.handleSubmit();
          }}
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-brand-dark">
              Ingresa el código
            </h2>
            <p className="text-sm text-gray-500">
              Enviamos un código de verificación a{" "}
              <span className="font-medium">{submittedEmail}</span>.
            </p>
          </div>

          {/* Code */}
          <confirmForm.Field
            name="code"
            validators={{
              onChange: ({ value }) =>
                !value ? "El código es requerido." : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-brand-dark"
                  htmlFor="reset-code"
                >
                  Código de verificación
                </label>
                <Input
                  id="reset-code"
                  type="text"
                  placeholder="000000"
                  autoComplete="one-time-code"
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
          </confirmForm.Field>

          {/* New password */}
          <confirmForm.Field
            name="newPassword"
            validators={{
              onChange: ({ value }) =>
                value.length < 8 ? "Mínimo 8 caracteres." : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-brand-dark"
                  htmlFor="new-password"
                >
                  Nueva contraseña
                </label>
                <div className="relative">
                  <Input
                    id="new-password"
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
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </confirmForm.Field>

          {/* Confirm password */}
          <confirmForm.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["newPassword"],
              onChange: ({ value, fieldApi }) =>
                value !== fieldApi.form.getFieldValue("newPassword")
                  ? "Las contraseñas no coinciden."
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-brand-dark"
                  htmlFor="confirm-new-password"
                >
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repite tu nueva contraseña"
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
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
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
                {isSubmitting ? "Guardando..." : "Cambiar contraseña"}
              </Button>
            )}
          </confirmForm.Subscribe>

          <button
            type="button"
            onClick={() => {
              setStep("request");
              setErrorInfo(null);
            }}
            className="w-full text-sm text-gray-500 hover:text-brand-accent transition-colors"
          >
            Volver
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <CognitoErrorDialog
        errorInfo={errorInfo}
        onClose={() => setErrorInfo(null)}
      />

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          requestForm.handleSubmit();
        }}
      >
        {/* Email */}
        <requestForm.Field
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
                className="text-sm font-medium text-brand-dark"
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
        </requestForm.Field>

        <requestForm.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2.5 text-sm mt-2"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar código"}
            </Button>
          )}
        </requestForm.Subscribe>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <span className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">o</span>
        <span className="flex-1 h-px bg-gray-100" />
      </div>

      <p className="text-center text-sm text-gray-500">
        ¿Ya recuerdas tu contraseña?{" "}
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
