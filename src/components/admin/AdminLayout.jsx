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
    LifeBuoy
} from "lucide-react";

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
        { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-brand-navy text-white transition-all duration-300 flex flex-col z-[110]`}
            >
                <div className="p-6 flex items-center justify-between overflow-hidden whitespace-nowrap">
                    {isSidebarOpen && (
                        <Link to="/" className="flex items-center gap-2">
                            <span className="font-extrabold text-xl tracking-tighter">DAUST Admin</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        to="/shop"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <LifeBuoy size={20} />
                        {isSidebarOpen && <span className="font-bold text-sm">View Store</span>}
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-50">
                    <h1 className="text-xl font-black text-brand-navy">
                        {menuItems.find(item => item.path === location.pathname)?.label || "Admin Panel"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs">A</div>
                        <span className="text-sm font-bold text-gray-700">Administrator</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
