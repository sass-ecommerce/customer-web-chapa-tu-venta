import { getTenantConfig } from "@/lib/config/tenants";
import { isLoginEnabled } from "@/lib/config/feature-flags";
import LoginForm from "@/components/auth/login-form";
import { FeatureUnavailable } from "@/components/shared/feature-unavailable";

export default async function TenantLoginPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);
  const loginEnabled = isLoginEnabled();

  return (
    <div className="font-body text-brand-dark min-h-screen bg-gray-50">
      <main className="px-4 pt-28 pb-16">
        <div className="mx-auto max-w-md">
          {loginEnabled ? (
            <>
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="font-display text-brand-dark mb-2 text-3xl font-bold">
                  Iniciar sesión
                </h1>
                <p className="text-sm text-gray-500">
                  Bienvenido de vuelta a{" "}
                  <span className="text-brand-dark font-semibold">
                    {config?.name ?? tenant}
                  </span>
                </p>
              </div>

              <LoginForm tenant={tenant} />
            </>
          ) : (
            <FeatureUnavailable
              title="Inicio de sesión no disponible"
              message="Estamos realizando trabajos de mantenimiento. Vuelve a intentarlo más tarde."
            />
          )}
        </div>
      </main>
    </div>
  );
}
