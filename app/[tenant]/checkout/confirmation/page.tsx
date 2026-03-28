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
    <div className="min-h-screen bg-gray-50/70 pt-[116px] pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-50 mb-1">
            <CheckCircle2 className="size-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">¡Pedido confirmado!</h1>
          <p className="text-gray-500 text-sm">
            Gracias,{" "}
            <span className="font-medium text-brand-dark">
              {order.buyer.firstName}
            </span>
            . Nos comunicaremos contigo pronto.
          </p>
          <div className="inline-block bg-gray-100 rounded-xl px-5 py-2 mt-1">
            <p className="text-xs text-gray-500">N° de pedido</p>
            <p className="text-lg font-bold text-brand-dark tracking-wider">
              {order.orderId}
            </p>
          </div>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-brand-dark text-sm">
            Productos ({order.items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-gray-100 flex items-center justify-center text-lg select-none shrink-0">
                  {item.product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-dark line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.quantity} × S/ {item.product.price.toFixed(2)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-brand-dark shrink-0">
                  S/ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>S/ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Envío</span>
              <span className={order.delivery.shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                {order.delivery.shippingCost === 0
                  ? "Gratis"
                  : `S/ ${order.delivery.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-brand-dark border-t border-gray-100 pt-2">
              <span>Total pagado</span>
              <span className="text-lg">S/ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery + Payment */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Delivery */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center gap-2">
              {order.delivery.method === "delivery" ? (
                <MapPin className="size-4 text-brand-accent" />
              ) : (
                <Store className="size-4 text-gray-500" />
              )}
              <h3 className="text-sm font-semibold text-brand-dark">Entrega</h3>
            </div>
            {order.delivery.method === "delivery" ? (
              <div className="text-sm text-gray-600 space-y-0.5">
                <p>{order.delivery.address}</p>
                {order.delivery.reference && (
                  <p className="text-xs text-gray-400">{order.delivery.reference}</p>
                )}
                <p className="font-medium text-brand-dark">{order.delivery.district}</p>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                <p>Recojo en tienda</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Av. Ejemplo 456, Miraflores
                </p>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center gap-2">
              {PAYMENT_ICONS[order.payment.method]}
              <h3 className="text-sm font-semibold text-brand-dark">Pago</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p>{PAYMENT_LABELS[order.payment.method]}</p>
              {order.payment.proofFileName && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Package className="size-3 text-gray-400" />
                  <p className="text-xs text-gray-400 truncate">
                    {order.payment.proofFileName}
                  </p>
                </div>
              )}
              {order.payment.method === "transfer" && (
                <p className="text-xs text-gray-400 mt-1">
                  Pendiente de verificación
                </p>
              )}
              {(order.payment.method === "yape" || order.payment.method === "plin") && (
                <p className="text-xs text-amber-600 font-medium mt-1">
                  Verificando comprobante...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buyer info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-brand-dark">Datos de contacto</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span className="text-xs text-gray-400 block">Nombre</span>
              {order.buyer.firstName} {order.buyer.lastName}
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Teléfono</span>
              {order.buyer.phone}
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Email</span>
              {order.buyer.email}
            </div>
            {order.buyer.dni && (
              <div>
                <span className="text-xs text-gray-400 block">DNI</span>
                {order.buyer.dni}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="flex-1 h-12 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-base border-0"
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
