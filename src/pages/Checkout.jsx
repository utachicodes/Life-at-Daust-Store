import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { ChevronLeft, Lock, AlertCircle } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import Button from "../components/ui/Button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function makeOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export default function Checkout() {
  const { items, subtotal, tax, total, clear } = useCart();
  const [orderId] = useState(makeOrderId());
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", year: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();
  const addOrder = useMutation(api.orders.addOrder);

  const lines = useMemo(
    () =>
      items.map((it) => ({
        name: it.name,
        qty: it.qty,
        price: it.price,
        color: it.selectedColor,
        size: it.selectedSize,
      })),
    [items]
  );

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-[var(--text-3xl)] text-brand-navy mb-3">
          Nothing to check out
        </h1>
        <p className="text-brand-navy/50 mb-8 text-sm">Your bag is empty.</p>
        <Link to="/shop">
          <Button variant="secondary">Back to Shop</Button>
        </Link>
      </main>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.year) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await addOrder({
        orderId,
        customer: { name: form.name, email: form.email, year: form.year },
        items: lines,
        subtotal,
        total,
      });
      clear();
      nav(`/order/success/${orderId}`, { state: { orderId } });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-brand-navy/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-sm text-brand-navy/40 hover:text-brand-navy transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-brand-navy/30">
            <Lock size={12} className="text-green-600" /> Secure Checkout
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-12 grid gap-12 lg:grid-cols-12 items-start">
        {/* Form */}
        <div className="lg:col-span-7">
          <h1 className="font-serif text-[var(--text-3xl)] text-brand-navy mb-2">
            Complete Your Order
          </h1>
          <p className="text-sm text-brand-navy/40 mb-10">
            Enter your details below.
          </p>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-brand-navy/40 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  className="w-full h-12 bg-white border border-brand-navy/[0.08] rounded-lg px-4 text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                  placeholder="e.g. Moussa Diop"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-brand-navy/40 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full h-12 bg-white border border-brand-navy/[0.08] rounded-lg px-4 text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                  placeholder="e.g. moussa@daust.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-xs font-medium text-brand-navy/40 mb-2"
              >
                Academic Year
              </label>
              <select
                id="year"
                className="w-full h-12 bg-white border border-brand-navy/[0.08] rounded-lg px-4 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all appearance-none cursor-pointer"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              >
                <option value="">Select your year</option>
                <option value="Freshman">Freshman (1st Year)</option>
                <option value="Sophomore">Sophomore (2nd Year)</option>
                <option value="Junior">Junior (3rd Year)</option>
                <option value="Senior">Senior (4th Year)</option>
                <option value="Graduate">Graduate Student</option>
              </select>
            </div>

            <Button
              type="submit"
              loading={loading}
              size="lg"
              className="w-full mt-4"
            >
              Confirm Order
            </Button>
          </form>
        </div>

        {/* Summary Sidebar */}
        <aside className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-brand-navy/[0.06] p-6 lg:p-8 sticky top-24">
            <h2 className="font-serif text-lg text-brand-navy mb-6">
              Order Review
            </h2>

            <ul className="space-y-4 mb-8 max-h-[280px] overflow-y-auto pr-2 scrollbar-hide">
              {items.map((it) => (
                <li
                  key={`${it.id}-${it.selectedSize}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-brand-ivory">
                    <img
                      src={it.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-brand-navy truncate">
                      {it.name}
                    </p>
                    <p className="text-xs text-brand-navy/35">
                      Qty: {it.qty}
                      {it.selectedSize ? ` / ${it.selectedSize}` : ""}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-brand-navy">
                    {formatPrice(it.price * it.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 text-sm border-t border-brand-navy/[0.06] pt-6">
              <div className="flex justify-between">
                <span className="text-brand-navy/50">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-navy/50">Shipping</span>
                <span className="text-brand-orange text-xs font-medium">
                  Free
                </span>
              </div>
              {tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-brand-navy/50">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-brand-navy/[0.06]">
                <span className="font-medium text-brand-navy">Total</span>
                <span className="text-lg font-serif text-brand-navy">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
