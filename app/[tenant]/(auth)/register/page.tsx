import { getTenantConfig } from "@/lib/config/tenants";
import RegisterForm from "@/components/auth/register-form";

export default async function TenantRegisterPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);

  return (
    <div className="font-body text-brand-dark min-h-screen bg-gray-50">
      <main className="px-4 pt-28 pb-16">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-display text-brand-dark mb-2 text-3xl font-bold">
              Crear cuenta
            </h1>
            <p className="text-sm text-gray-500">
              Regístrate para comprar en{" "}
              <span className="text-brand-dark font-semibold">
                {config?.name ?? tenant}
              </span>
            </p>
          </div>

          <RegisterForm tenant={tenant} />
        </div>
      </main>
    </div>
  );
}
