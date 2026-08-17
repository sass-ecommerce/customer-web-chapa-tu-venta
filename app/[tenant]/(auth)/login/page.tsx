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
    <div className="min-h-screen bg-gray-50 font-body text-brand-dark">
      <main className="pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto">
          {loginEnabled ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-brand-dark mb-2">
                  Iniciar sesión
                </h1>
                <p className="text-gray-500 text-sm">
                  Bienvenido de vuelta a{" "}
                  <span className="font-semibold text-brand-dark">
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
