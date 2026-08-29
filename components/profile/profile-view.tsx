"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  MapPin,
  Mail,
  Edit2,
  Camera,
  Shield,
  Bell,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { tenantHref } from "@/lib/utils/tenant-href";
import { mockProducts } from "@/lib/mocks/mock-products";

type Tab = "perfil" | "pedidos" | "favoritos" | "configuracion";

const mockOrders = [
  {
    id: "ORD-2026-0042",
    date: "22 Mar 2026",
    status: "Entregado",
    statusColor: "green" as const,
    items: 2,
    total: 189.98,
    payment: "Yape",
  },
  {
    id: "ORD-2026-0031",
    date: "10 Mar 2026",
    status: "En camino",
    statusColor: "blue" as const,
    items: 1,
    total: 89.99,
    payment: "Efectivo",
  },
  {
    id: "ORD-2026-0018",
    date: "28 Feb 2026",
    status: "Procesando",
    statusColor: "yellow" as const,
    items: 3,
    total: 254.97,
    payment: "Transferencia",
  },
];

const statusStyles: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "perfil", label: "Mi perfil", icon: <User size={16} /> },
  { id: "pedidos", label: "Mis pedidos", icon: <Package size={16} /> },
  { id: "favoritos", label: "Favoritos", icon: <Heart size={16} /> },
  { id: "configuracion", label: "Configuración", icon: <Settings size={16} /> },
];

export function ProfileView({ tenant }: { tenant: string }) {
  const { user, logOut } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const tab = searchParams.get("tab");
    if (tab === "pedidos" || tab === "favoritos" || tab === "configuracion")
      return tab;
    return "perfil";
  });
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "pedidos" || tab === "favoritos" || tab === "configuracion") {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab("perfil");
    }
  }, [searchParams]);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 3, 5, 7]);
  const [notifications, setNotifications] = useState({
    ofertas: true,
    pedidos: true,
    nuevos: false,
  });

  const email = user?.signInDetails?.loginId ?? user?.username ?? "";
  const displayName = email.split("@")[0] ?? "Usuario";
  const favoriteProducts = mockProducts.filter((p) =>
    favoriteIds.includes(p.id),
  );

  function toggleFavorite(id: number) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="font-body min-h-screen bg-gray-50">
      {/* Header banner */}
      <div className="bg-gray-900 pt-[100px]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-end gap-5">
            <div className="relative shrink-0">
              <div className="bg-brand-accent flex h-20 w-20 items-center justify-center rounded-full ring-4 ring-white/10">
                <User size={36} className="text-white" />
              </div>
              <button
                className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
                aria-label="Editar foto"
              >
                <Camera size={13} className="text-gray-600" />
              </button>
            </div>
            <div className="pb-1">
              <p className="mb-0.5 text-xs text-gray-400">Mi cuenta</p>
              <h1 className="font-display text-xl leading-tight font-semibold text-white">
                {displayName}
              </h1>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-400">
                <Mail size={12} />
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className="sticky top-[100px] z-40 border-b border-gray-200 bg-white md:hidden">
        <div className="scrollbar-hide flex overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex shrink-0 flex-col items-center gap-1 border-b-2 px-5 py-3 text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? "text-brand-accent border-brand-accent"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden w-[240px] shrink-0 flex-col md:flex">
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <nav className="py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 border-r-2 px-5 py-3 text-left text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "text-brand-accent border-brand-accent bg-red-50"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={() => logOut()}
                  className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* ── Mi perfil ── */}
            {activeTab === "perfil" && (
              <div className="space-y-5">
                {/* Información personal */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-sm font-semibold text-gray-900">
                    Información personal
                  </h2>
                  <div className="space-y-4">
                    {/* Email (read-only) */}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Correo electrónico
                      </label>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5">
                        <span className="text-sm text-gray-700">{email}</span>
                        <Mail size={14} className="shrink-0 text-gray-400" />
                      </div>
                    </div>

                    {/* Editable fields */}
                    {[
                      { label: "Nombre", placeholder: "Sin registrar" },
                      { label: "Apellido", placeholder: "Sin registrar" },
                      { label: "Teléfono", placeholder: "Sin registrar" },
                      { label: "DNI", placeholder: "Sin registrar" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          {field.label}
                        </label>
                        <div className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 transition-colors hover:border-gray-300">
                          <span className="text-sm text-gray-400 italic">
                            {field.placeholder}
                          </span>
                          <button
                            className="hover:text-brand-accent rounded p-0.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Editar ${field.label}`}
                          >
                            <Edit2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    disabled
                    className="mt-6 cursor-not-allowed rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-400"
                  >
                    Guardar cambios
                  </button>
                </section>

                {/* Dirección de entrega */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-sm font-semibold text-gray-900">
                    Dirección de entrega
                  </h2>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <MapPin size={20} className="text-gray-400" />
                    </div>
                    <p className="mb-4 text-sm text-gray-500">
                      No tienes una dirección guardada
                    </p>
                    <button className="border-brand-accent text-brand-accent flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50">
                      + Agregar dirección
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* ── Mis pedidos ── */}
            {activeTab === "pedidos" && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Mis pedidos ({mockOrders.length})
                </h2>
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                          <ShoppingBag size={18} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.id}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {order.date} · {order.items}{" "}
                            {order.items === 1 ? "producto" : "productos"} ·{" "}
                            {order.payment}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.statusColor]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                      <span className="text-sm font-semibold text-gray-900">
                        S/ {order.total.toFixed(2)}
                      </span>
                      <Link
                        href={tenantHref(tenant, "/checkout/confirmation")}
                        className="text-brand-accent flex items-center gap-1 text-xs font-medium hover:underline"
                      >
                        Ver detalle
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Favoritos ── */}
            {activeTab === "favoritos" && (
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900">
                  Favoritos ({favoriteProducts.length})
                </h2>
                {favoriteProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                      <Heart size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Aún no tienes favoritos
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {favoriteProducts.map((p) => (
                      <div
                        key={p.id}
                        className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <button
                            onClick={() => toggleFavorite(p.id)}
                            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
                            aria-label="Quitar de favoritos"
                          >
                            <Heart
                              size={14}
                              className="text-brand-accent fill-brand-accent"
                            />
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="mb-1 line-clamp-2 text-xs leading-tight font-medium text-gray-800">
                            {p.name}
                          </p>
                          <div className="mb-2 flex items-center gap-1">
                            <Star
                              size={10}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="text-[10px] text-gray-500">
                              {p.rating}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-brand-accent text-sm font-bold">
                              S/ {p.price}
                            </span>
                            <Link
                              href={tenantHref(tenant, `/products/${p.id}`)}
                              className="hover:text-brand-accent text-[10px] font-medium text-gray-500 transition-colors"
                            >
                              Ver →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Configuración ── */}
            {activeTab === "configuracion" && (
              <div className="space-y-5">
                {/* Notificaciones */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <Bell size={16} className="text-gray-500" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      Notificaciones
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {(
                      [
                        {
                          key: "ofertas",
                          label: "Ofertas y promociones",
                          desc: "Descuentos exclusivos y flash sales",
                        },
                        {
                          key: "pedidos",
                          label: "Estado de pedidos",
                          desc: "Actualizaciones de envío y entrega",
                        },
                        {
                          key: "nuevos",
                          label: "Nuevos productos",
                          desc: "Lanzamientos y novedades",
                        },
                      ] as const
                    ).map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={notifications[item.key]}
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key],
                            }))
                          }
                          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                            notifications[item.key]
                              ? "bg-brand-accent"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                              notifications[item.key]
                                ? "translate-x-[18px]"
                                : "translate-x-[3px]"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Seguridad */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <Shield size={16} className="text-gray-500" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      Seguridad
                    </h2>
                  </div>
                  <Link
                    href={tenantHref(tenant, "/forgot-password")}
                    className="hover:text-brand-accent group flex w-full items-center justify-between py-2 text-sm text-gray-700 transition-colors"
                  >
                    <span>Cambiar contraseña</span>
                    <ChevronRight
                      size={16}
                      className="group-hover:text-brand-accent text-gray-400 transition-colors"
                    />
                  </Link>
                </section>

                {/* Cuenta */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-sm font-semibold text-gray-900">
                    Cuenta
                  </h2>
                  <button className="flex items-center gap-2 text-sm font-medium text-red-500 transition-colors hover:text-red-600">
                    <Trash2 size={15} />
                    Eliminar cuenta
                  </button>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
