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
    Layers
} from "lucide-react";
import logo from "../../assets/logo.png";

export default function AdminLayout() {
    const { isAdmin, logout } = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-72" : "w-[88px]"
                    } bg-brand-navy text-white transition-all duration-500 ease-in-out flex flex-col z-[110] relative shadow-[10px_0_40px_rgba(0,0,0,0.1)]`}
            >
                {/* Logo area */}
                <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
                    {isSidebarOpen ? (
                        <Link to="/" className="flex items-center gap-4 overflow-hidden group">
                            <img src={logo} alt="DAUST" className="h-10 w-auto brightness-0 invert transition-transform group-hover:scale-110" />
                            <div className="flex flex-col">
                                <span className="font-[900] text-[11px] tracking-[0.2em] uppercase leading-none mb-1">Store Admin</span>
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Life at DAUST</span>
                            </div>
                        </Link>
                    ) : (
                        <img src={logo} alt="DAUST" className="h-8 w-auto brightness-0 invert mx-auto" />
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                    {isSidebarOpen && <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 ml-4">Management</p>}
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={20} className={`flex-shrink-0 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                {isSidebarOpen && <span className="text-xs font-[800] uppercase tracking-widest">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        to="/shop"
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/30 hover:text-white hover:bg-white/5 transition-all group"
                    >
                        <ExternalLink size={18} />
                        {isSidebarOpen && <span className="text-xs font-[800] uppercase tracking-widest">Public Store</span>}
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all group"
                    >
                        <LogOut size={18} />
                        {isSidebarOpen && <span className="text-xs font-[800] uppercase tracking-widest">Exit Portal</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-cream/20 pointer-events-none" />

                {/* Top Bar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 z-50">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-3 bg-gray-50 hover:bg-brand-navy hover:text-white text-brand-navy rounded-xl transition-all duration-300 shadow-sm"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="text-xl font-[900] text-brand-navy tracking-tight hidden sm:block">
                            {menuItems.find(item => item.path === location.pathname)?.label || "Admin Panel"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-xs font-black text-brand-navy uppercase tracking-widest leading-none mb-1">System Admin</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Authorized Session</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-brand-navy shadow-lg shadow-brand-navy/20 flex items-center justify-center group cursor-pointer hover:bg-brand-orange transition-all duration-500 overflow-hidden relative">
                            <span className="text-white font-[900] text-lg relative z-10 transition-transform group-hover:scale-110">A</span>
                            <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-10 relative">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
