import { getTenantConfig } from "@/lib/config/tenants";
import LoginForm from "@/components/auth/login-form";

export default async function TenantLoginPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);

  return (
    <div className="min-h-screen bg-gray-50 font-body text-brand-dark">
      <main className="pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto">
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
        </div>
      </main>
    </div>
  );
}
