import React, { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  ChevronLeft,
  Menu,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function AdminLayout() {
  const { isAdmin, logout } = useAdmin();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Layers, label: "Collections", path: "/admin/collections" },
    { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
  ];

  const currentPage =
    menuItems.find((item) => item.path === location.pathname)?.label ||
    "Admin";

  return (
    <div className="flex h-screen overflow-hidden bg-brand-cream">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-60"
        } bg-brand-navy flex flex-col transition-all duration-300 ease-out relative z-20`}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 overflow-hidden">
              <span className="font-serif text-white text-lg whitespace-nowrap">
                DAUST
              </span>
              <span className="text-white/30 text-xs font-medium">Admin</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors ${
              collapsed ? "mx-auto" : "ml-auto"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 h-10 rounded-lg transition-all duration-200 ${
                  collapsed ? "justify-center px-0" : "px-3"
                } ${
                  isActive
                    ? "bg-white/[0.1] text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-[13px] font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
          <Link
            to="/shop"
            title={collapsed ? "View Store" : undefined}
            className={`flex items-center gap-3 h-10 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <ExternalLink size={18} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-[13px] font-medium">View Store</span>
            )}
          </Link>
          <button
            onClick={logout}
            title={collapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 h-10 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/[0.06] transition-all ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-[13px] font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-brand-navy/[0.06] flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
          <h1 className="text-base font-semibold text-brand-navy">
            {currentPage}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
