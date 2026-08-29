import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { CartRoot } from "@/components/cart/cart-root";
import { isLoginEnabled, isCartEnabled } from "@/lib/config/feature-flags";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  return (
    <CartRoot>
      <Navbar
        tenant={tenant}
        showLogin={isLoginEnabled()}
        showCart={isCartEnabled()}
      />
      {children}
      <Footer />
    </CartRoot>
  );
}
