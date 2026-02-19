import React, { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { formatPrice } from "../../utils/format.js";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function AdminDashboard() {
  const products = useQuery(api.products.list);
  const orders = useQuery(api.orders.list);

  const isLoading = products === undefined || orders === undefined;

  const stats = useMemo(() => {
    if (!products || !orders) return [];

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const activeOrders = orders.filter(
      (o) => o.status === "Processing" || o.status === "Shipped"
    ).length;
    const totalProducts = products.length;
    const completedOrders = orders.filter(
      (o) => o.status === "Delivered"
    ).length;

    return [
      {
        label: "Revenue",
        value: formatPrice(totalRevenue),
        icon: DollarSign,
        accent: "text-green-600 bg-green-50",
      },
      {
        label: "Active Orders",
        value: activeOrders.toString(),
        icon: ShoppingBag,
        accent: "text-brand-orange bg-brand-orange/10",
      },
      {
        label: "Products",
        value: totalProducts.toString(),
        icon: Package,
        accent: "text-blue-600 bg-blue-50",
      },
      {
        label: "Fulfillment",
        value:
          orders.length > 0
            ? `${Math.round((completedOrders / orders.length) * 100)}%`
            : "0%",
        icon: CheckCircle2,
        accent: "text-emerald-600 bg-emerald-50",
      },
    ];
  }, [products, orders]);

  const recentOrders = useMemo(() => {
    return orders?.slice(0, 5) || [];
  }, [orders]);

  const topCategories = useMemo(() => {
    if (!products) return [];
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [products]);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-brand-navy/30 text-xs font-medium">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-brand-navy/[0.04] p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.accent}`}
              >
                <stat.icon size={18} />
              </div>
              <TrendingUp size={14} className="text-green-500/50" />
            </div>
            <p className="text-xs text-brand-navy/35 font-medium mb-0.5">
              {stat.label}
            </p>
            <p className="text-xl font-semibold text-brand-navy tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-brand-navy/[0.04]">
          <div className="flex justify-between items-center p-5 border-b border-brand-navy/[0.04]">
            <h2 className="text-sm font-semibold text-brand-navy">
              Recent Activity
            </h2>
            <span className="text-xs text-brand-orange font-medium cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="divide-y divide-brand-navy/[0.03]">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between px-5 py-4 hover:bg-brand-cream/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-ivory rounded-lg flex items-center justify-center">
                    <ShoppingBag size={16} className="text-brand-navy/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-navy">
                      {order.orderId}
                    </p>
                    <p className="text-xs text-brand-navy/35">
                      {order.customer.name} &middot; {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-brand-navy">
                    {formatPrice(order.total)}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                      order.status === "Processing"
                        ? "bg-amber-50 text-amber-600"
                        : order.status === "Shipped"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}

            {recentOrders.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-brand-navy/25 text-sm">No orders yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Categories sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-brand-navy rounded-xl p-6 text-white">
            <h2 className="text-sm font-semibold mb-6">Inventory Share</h2>
            <div className="space-y-5">
              {topCategories.map(([cat, count], i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/50">{cat}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-orange rounded-full transition-all duration-700"
                      style={{
                        width: `${(count / products.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              {topCategories.length === 0 && (
                <p className="text-white/20 text-xs text-center py-6">
                  Add products to see breakdown
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-brand-navy/[0.04] p-5">
            <h2 className="text-sm font-semibold text-brand-navy mb-4">
              Quick Stats
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-brand-navy/40">Total Products</span>
                <span className="font-medium text-brand-navy">
                  {products.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-navy/40">Total Orders</span>
                <span className="font-medium text-brand-navy">
                  {orders.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-navy/40">Categories</span>
                <span className="font-medium text-brand-navy">
                  {topCategories.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
