import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { CartRoot } from "@/components/cart/cart-root";
import { getTenantConfig } from "@/lib/tenants";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);
  if (!config) notFound();
  return (
    <CartRoot>
      <Navbar tenant={tenant} />
      {children}
      <Footer />
    </CartRoot>
  );
}
