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
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Header banner */}
      <div className="bg-gray-900 pt-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center ring-4 ring-white/10">
                <User size={36} className="text-white" />
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Editar foto"
              >
                <Camera size={13} className="text-gray-600" />
              </button>
            </div>
            <div className="pb-1">
              <p className="text-xs text-gray-400 mb-0.5">Mi cuenta</p>
              <h1 className="text-white text-xl font-semibold leading-tight font-display">
                {displayName}
              </h1>
              <p className="text-gray-400 text-sm flex items-center gap-1.5 mt-0.5">
                <Mail size={12} />
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-[100px] z-40">
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-5 py-3 text-xs font-medium whitespace-nowrap transition-colors shrink-0 border-b-2 ${
                activeTab === item.id
                  ? "text-brand-accent border-brand-accent"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:flex flex-col w-[240px] shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <nav className="py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 w-full px-5 py-3 text-sm font-medium transition-colors text-left border-r-2 ${
                      activeTab === item.id
                        ? "bg-red-50 text-brand-accent border-brand-accent"
                        : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900"
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
                  className="flex items-center gap-3 w-full px-5 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* ── Mi perfil ── */}
            {activeTab === "perfil" && (
              <div className="space-y-5">
                {/* Información personal */}
                <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-5">
                    Información personal
                  </h2>
                  <div className="space-y-4">
                    {/* Email (read-only) */}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Correo electrónico
                      </label>
                      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50">
                        <span className="text-sm text-gray-700">{email}</span>
                        <Mail size={14} className="text-gray-400 shrink-0" />
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
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          {field.label}
                        </label>
                        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors group">
                          <span className="text-sm text-gray-400 italic">
                            {field.placeholder}
                          </span>
                          <button
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-gray-400 hover:text-brand-accent"
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
                    className="mt-6 px-5 py-2.5 rounded-lg bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed"
                  >
                    Guardar cambios
                  </button>
                </section>

                {/* Dirección de entrega */}
                <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-5">
                    Dirección de entrega
                  </h2>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <MapPin size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      No tienes una dirección guardada
                    </p>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-accent text-brand-accent text-sm font-medium hover:bg-red-50 transition-colors">
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
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                          <ShoppingBag size={18} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.id}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {order.date} · {order.items}{" "}
                            {order.items === 1 ? "producto" : "productos"} ·{" "}
                            {order.payment}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[order.statusColor]}`}
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
                        className="flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline"
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
                <h2 className="text-sm font-semibold text-gray-900 mb-4">
                  Favoritos ({favoriteProducts.length})
                </h2>
                {favoriteProducts.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <Heart size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Aún no tienes favoritos
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoriteProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group"
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={() => toggleFavorite(p.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
                            aria-label="Quitar de favoritos"
                          >
                            <Heart
                              size={14}
                              className="text-brand-accent fill-brand-accent"
                            />
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-medium text-gray-800 leading-tight line-clamp-2 mb-1">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star
                              size={10}
                              className="text-yellow-400 fill-yellow-400"
                            />
                            <span className="text-[10px] text-gray-500">
                              {p.rating}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-brand-accent">
                              S/ {p.price}
                            </span>
                            <Link
                              href={tenantHref(tenant, `/products/${p.id}`)}
                              className="text-[10px] font-medium text-gray-500 hover:text-brand-accent transition-colors"
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
                <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
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
                          <p className="text-xs text-gray-400 mt-0.5">
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
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
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
                <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Shield size={16} className="text-gray-500" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      Seguridad
                    </h2>
                  </div>
                  <Link
                    href={tenantHref(tenant, "/forgot-password")}
                    className="flex items-center justify-between w-full py-2 text-sm text-gray-700 hover:text-brand-accent transition-colors group"
                  >
                    <span>Cambiar contraseña</span>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-brand-accent transition-colors"
                    />
                  </Link>
                </section>

                {/* Cuenta */}
                <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-5">
                    Cuenta
                  </h2>
                  <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
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
