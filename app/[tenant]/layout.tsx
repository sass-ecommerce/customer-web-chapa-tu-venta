import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
