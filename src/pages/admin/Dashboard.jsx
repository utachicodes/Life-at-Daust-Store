import React, { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
    TrendingUp,
    ShoppingBag,
    Package,
    Clock,
    CheckCircle2,
    DollarSign,
    Users
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function AdminDashboard() {
    const products = useQuery(api.products.list);
    const orders = useQuery(api.orders.list);

    const isLoading = products === undefined || orders === undefined;

    const stats = useMemo(() => {
        if (!products || !orders) return [];

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const activeOrders = orders.filter(o => o.status === "Processing" || o.status === "Shipped").length;
        const totalProducts = products.length;
        const completedOrders = orders.filter(o => o.status === "Delivered").length;

        return [
            { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "bg-green-50 text-green-600" },
            { label: "Active Orders", value: activeOrders.toString(), icon: ShoppingBag, color: "bg-brand-orange/10 text-brand-orange" },
            { label: "Catalog Size", value: totalProducts.toString(), icon: Package, color: "bg-blue-50 text-blue-600" },
            { label: "Fulfillment Rate", value: orders.length > 0 ? `${Math.round((completedOrders / orders.length) * 100)}%` : "0%", icon: CheckCircle2, color: "bg-purple-50 text-purple-600" },
        ];
    }, [products, orders]);

    const recentOrders = useMemo(() => {
        return orders?.slice(0, 5) || [];
    }, [orders]);

    const topCategories = useMemo(() => {
        if (!products) return [];
        const counts = {};
        products.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    }, [products]);

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Analytics Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.color} transition-colors`}>
                                <stat.icon size={22} />
                            </div>
                            <TrendingUp size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-brand-navy tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-black text-brand-navy">Recent Activity</h2>
                        <button className="text-brand-orange text-xs font-black uppercase tracking-widest hover:underline">View All Orders</button>
                    </div>

                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order._id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl group hover:bg-gray-100/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <ShoppingBag size={20} className="text-brand-navy" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-navy text-sm">Order {order.orderId}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.customer.name} • {order.items.length} items</p>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-6">
                                    <div>
                                        <p className="font-black text-brand-navy text-sm">${order.total.toFixed(2)}</p>
                                        <p className="text-[9px] font-black uppercase text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.status === "Processing" ? "bg-brand-orange/10 text-brand-orange" :
                                            order.status === "Shipped" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {recentOrders.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No recent orders found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Categories Breakdown */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-brand-navy p-8 rounded-[2rem] text-white shadow-xl shadow-brand-navy/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
                        <h2 className="text-lg font-black tracking-tight mb-8 relative z-10">Inventory Share</h2>
                        <div className="space-y-6 relative z-10">
                            {topCategories.map(([cat, count], i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="text-brand-cream/60">{cat}</span>
                                        <span>{count} products</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand-orange rounded-full transition-all duration-1000"
                                            style={{ width: `${(count / products.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}

                            {topCategories.length === 0 && (
                                <p className="text-brand-cream/30 text-xs italic text-center py-10">Add products to see analytics</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-brand-navy mb-6">Quick Links</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-brand-orange/5 hover:text-brand-orange transition-all gap-2">
                                <Package size={20} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Inventory</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-brand-orange/5 hover:text-brand-orange transition-all gap-2">
                                <Clock size={20} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Pending</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
