"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Banknote,
  Building2,
  CheckCircle2,
  MapPin,
  Package,
  Smartphone,
  Store,
} from "lucide-react";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { tenantHref } from "@/lib/utils/tenant-href";
import { Button } from "@/components/ui/button";

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Contra entrega (efectivo)",
  yape: "Yape",
  plin: "Plin",
  transfer: "Transferencia bancaria",
};

const PAYMENT_ICONS: Record<string, React.ReactNode> = {
  cash: <Banknote className="size-4 text-green-600" />,
  yape: <Smartphone className="size-4 text-purple-600" />,
  plin: <Smartphone className="size-4 text-green-500" />,
  transfer: <Building2 className="size-4 text-blue-600" />,
};

export default function ConfirmationPage() {
  const router = useRouter();
  const params = useParams();
  const tenant = params?.tenant as string;
  const order = useCheckoutStore((s) => s.order);
  const reset = useCheckoutStore((s) => s.reset);

  useEffect(() => {
    if (!order) router.replace(tenantHref(tenant, "/"));
  }, [order, router, tenant]);

  if (!order) return null;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-50/70 px-4 pt-[116px] pb-16 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Success header */}
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <div className="mb-1 inline-flex size-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="size-8 text-green-500" />
          </div>
          <h1 className="text-brand-dark text-2xl font-bold">
            ¡Pedido confirmado!
          </h1>
          <p className="text-sm text-gray-500">
            Gracias,{" "}
            <span className="text-brand-dark font-medium">
              {order.buyer.firstName}
            </span>
            . Nos comunicaremos contigo pronto.
          </p>
          <div className="mt-1 inline-block rounded-xl bg-gray-100 px-5 py-2">
            <p className="text-xs text-gray-500">N° de pedido</p>
            <p className="text-brand-dark text-lg font-bold tracking-wider">
              {order.orderId}
            </p>
          </div>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>

        {/* Items */}
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-brand-dark text-sm font-semibold">
            Productos ({order.items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg select-none">
                  {item.product.image}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-brand-dark line-clamp-1 text-sm font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.quantity} × S/ {item.product.price.toFixed(2)}
                  </p>
                </div>
                <span className="text-brand-dark shrink-0 text-sm font-semibold">
                  S/ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>S/ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Envío</span>
              <span
                className={
                  order.delivery.shippingCost === 0
                    ? "font-medium text-green-600"
                    : ""
                }
              >
                {order.delivery.shippingCost === 0
                  ? "Gratis"
                  : `S/ ${order.delivery.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="text-brand-dark flex justify-between border-t border-gray-100 pt-2 font-semibold">
              <span>Total pagado</span>
              <span className="text-lg">S/ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery + Payment */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Delivery */}
          <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2">
              {order.delivery.method === "delivery" ? (
                <MapPin className="text-brand-accent size-4" />
              ) : (
                <Store className="size-4 text-gray-500" />
              )}
              <h3 className="text-brand-dark text-sm font-semibold">Entrega</h3>
            </div>
            {order.delivery.method === "delivery" ? (
              <div className="space-y-0.5 text-sm text-gray-600">
                <p>{order.delivery.address}</p>
                {order.delivery.reference && (
                  <p className="text-xs text-gray-400">
                    {order.delivery.reference}
                  </p>
                )}
                <p className="text-brand-dark font-medium">
                  {order.delivery.district}
                </p>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                <p>Recojo en tienda</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Av. Ejemplo 456, Miraflores
                </p>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2">
              {PAYMENT_ICONS[order.payment.method]}
              <h3 className="text-brand-dark text-sm font-semibold">Pago</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p>{PAYMENT_LABELS[order.payment.method]}</p>
              {order.payment.proofFileName && (
                <div className="mt-1 flex items-center gap-1.5">
                  <Package className="size-3 text-gray-400" />
                  <p className="truncate text-xs text-gray-400">
                    {order.payment.proofFileName}
                  </p>
                </div>
              )}
              {order.payment.method === "transfer" && (
                <p className="mt-1 text-xs text-gray-400">
                  Pendiente de verificación
                </p>
              )}
              {(order.payment.method === "yape" ||
                order.payment.method === "plin") && (
                <p className="mt-1 text-xs font-medium text-amber-600">
                  Verificando comprobante...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buyer info */}
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="text-brand-dark text-sm font-semibold">
            Datos de contacto
          </h3>
          <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
            <div>
              <span className="block text-xs text-gray-400">Nombre</span>
              {order.buyer.firstName} {order.buyer.lastName}
            </div>
            <div>
              <span className="block text-xs text-gray-400">Teléfono</span>
              {order.buyer.phone}
            </div>
            <div>
              <span className="block text-xs text-gray-400">Email</span>
              {order.buyer.email}
            </div>
            {order.buyer.dni && (
              <div>
                <span className="block text-xs text-gray-400">DNI</span>
                {order.buyer.dni}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="bg-brand-accent hover:bg-brand-accent-hover h-12 flex-1 rounded-xl border-0 text-base font-semibold text-white"
          >
            <Link href={tenantHref(tenant, "/")} onClick={reset}>
              Seguir comprando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
