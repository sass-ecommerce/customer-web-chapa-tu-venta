import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { CartRoot } from "@/components/cart/cart-root";
import { isLoginEnabled, isCartEnabled } from "@/lib/config/feature-flags";
import { getTenantBranding } from "@/lib/api/tenants";
import { getTenantCategories } from "@/lib/api/categories";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const [branding, categories] = await Promise.all([
    getTenantBranding(tenant),
    getTenantCategories(tenant),
  ]);

  return (
    <CartRoot>
      <Navbar
        tenant={tenant}
        branding={branding}
        categories={categories}
        showLogin={isLoginEnabled()}
        showCart={isCartEnabled()}
      />
      {children}
      <Footer />
    </CartRoot>
  );
}
