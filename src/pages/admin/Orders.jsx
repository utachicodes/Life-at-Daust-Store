import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ChevronRight,
  User,
  Mail,
  Calendar,
  X,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { formatPrice } from "../../utils/format.js";

export default function AdminOrders() {
  const orders = useQuery(api.orders.list);
  const updateStatus = useMutation(api.orders.updateStatus);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const isLoading = orders === undefined;

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-50 text-amber-600";
      case "Shipped":
        return "bg-blue-50 text-blue-600";
      case "Delivered":
        return "bg-green-50 text-green-600";
      case "Cancelled":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus });
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-brand-navy/30 text-xs font-medium">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
      {/* Orders List */}
      <div
        className={`${
          selectedOrder ? "lg:col-span-5" : "lg:col-span-12"
        } transition-all duration-300`}
      >
        <div className="bg-white rounded-xl border border-brand-navy/[0.04] overflow-hidden">
          <div className="p-5 border-b border-brand-navy/[0.04]">
            <h2 className="text-sm font-semibold text-brand-navy">
              All Orders
            </h2>
            <p className="text-xs text-brand-navy/30 mt-0.5">
              {orders.length} total
            </p>
          </div>

          <div className="divide-y divide-brand-navy/[0.03] max-h-[calc(100vh-260px)] overflow-y-auto">
            {orders.map((order) => (
              <button
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full text-left px-5 py-4 hover:bg-brand-cream/30 transition-colors flex items-center justify-between ${
                  selectedOrder?._id === order._id
                    ? "bg-brand-cream/50"
                    : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-brand-navy">
                      {order.orderId}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-brand-navy/35">
                    {order.customer.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-brand-navy">
                    {formatPrice(order.total)}
                  </span>
                  <ChevronRight
                    size={14}
                    className={`text-brand-navy/15 transition-colors ${
                      selectedOrder?._id === order._id
                        ? "text-brand-orange"
                        : ""
                    }`}
                  />
                </div>
              </button>
            ))}

            {orders.length === 0 && (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-ivory flex items-center justify-center mx-auto mb-3">
                  <Package className="h-5 w-5 text-brand-navy/20" />
                </div>
                <p className="text-brand-navy/25 text-sm">No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details */}
      {selectedOrder && (
        <div className="lg:col-span-7 animate-fade-in-up">
          <div className="bg-white rounded-xl border border-brand-navy/[0.04] overflow-hidden sticky top-6">
            {/* Detail header */}
            <div className="p-5 border-b border-brand-navy/[0.04] flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-base font-semibold text-brand-navy">
                    {selectedOrder.orderId}
                  </h2>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-brand-navy/30">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-brand-navy/25 hover:text-brand-navy rounded-md transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Status actions */}
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    status: "Processing",
                    icon: Clock,
                    active: "bg-amber-600 text-white",
                  },
                  {
                    status: "Shipped",
                    icon: Truck,
                    active: "bg-blue-600 text-white",
                  },
                  {
                    status: "Delivered",
                    icon: CheckCircle2,
                    active: "bg-green-600 text-white",
                  },
                ].map(({ status, icon: Icon, active }) => (
                  <button
                    key={status}
                    onClick={() =>
                      handleStatusUpdate(selectedOrder._id, status)
                    }
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      selectedOrder.status === status
                        ? active
                        : "bg-brand-ivory text-brand-navy/50 hover:bg-brand-ivory/80"
                    }`}
                  >
                    <Icon size={14} />
                    {status}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer */}
                <div>
                  <h3 className="text-xs font-medium text-brand-navy/35 mb-4">
                    Customer
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-brand-ivory flex items-center justify-center text-brand-navy/25">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-navy/30">Name</p>
                        <p className="text-sm font-medium text-brand-navy">
                          {selectedOrder.customer.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-brand-ivory flex items-center justify-center text-brand-navy/25">
                        <Mail size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-navy/30">Email</p>
                        <p className="text-sm font-medium text-brand-navy">
                          {selectedOrder.customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-brand-ivory flex items-center justify-center text-brand-navy/25">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-navy/30">Year</p>
                        <p className="text-sm font-medium text-brand-navy">
                          {selectedOrder.customer.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-xs font-medium text-brand-navy/35 mb-4">
                    Items
                  </h3>
                  <div className="bg-brand-ivory/50 rounded-lg overflow-hidden">
                    <div className="divide-y divide-brand-navy/[0.04]">
                      {selectedOrder.items.map((item, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 flex items-center justify-between"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-brand-navy truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-brand-navy/30">
                              Qty: {item.qty}
                              {item.size ? ` / ${item.size}` : ""}
                              {item.color ? ` / ${item.color}` : ""}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-brand-navy ml-4">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 bg-brand-navy text-white flex justify-between items-center">
                      <span className="text-xs text-white/50">Total</span>
                      <span className="text-base font-semibold">
                        {formatPrice(selectedOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
