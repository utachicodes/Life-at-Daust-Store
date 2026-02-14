// src/pages/Checkout.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.js";

const fmt = (n) => `$${n.toFixed(2)}`;
const SHEETS_URL = import.meta.env.VITE_SHEETS_WEBAPP_URL;
const SECRET = import.meta.env.VITE_SHEETS_SECRET;

function makeOrderId() {
  return "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function Checkout() {
  const { items, subtotal, tax, shipping, total, clear } = useCart();
  const [orderId] = useState(makeOrderId());
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", year: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const lines = useMemo(
    () =>
      items.map((it) => ({
        name: it.name,
        qty: it.qty,
        unit: it.price,
        line: it.price * it.qty,
      })),
    [items]
  );

  if (items.length === 0) {
    return (
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-brand-navy">No items to checkout</h1>
      </section>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.year) {
      setError("Please fill your name, email, and year.");
      return;
    }
    if (!SHEETS_URL || !SECRET) {
      setError("Checkout is currently unavailable. Please contact support.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        secret: SECRET,
        orderId,
        customer: {
          name: form.name,
          email: form.email,
          year: form.year,
        },
        lines,
        subtotal,
        total,
      };

      const r = await fetch(SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || data?.ok === false) {
        throw new Error(data?.error || "Failed to save order");
      }

      clear();
      nav(`/order/success/${orderId}`, { state: { orderId } });
    } catch (err) {
      console.error(err);
      setError("Could not place the order. Please try again or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 grid gap-10 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy mb-6">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              className="w-full border rounded px-4 py-3 focus:ring-brand-orange focus:border-brand-orange outline-none transition"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              className="w-full border rounded px-4 py-3 focus:ring-brand-orange focus:border-brand-orange outline-none transition"
              placeholder="e.g. john@daust.edu"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <select
              id="year"
              className="w-full border rounded px-4 py-3 bg-white focus:ring-brand-orange focus:border-brand-orange outline-none transition"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              <option value="">Select your year</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-navy text-white py-4 rounded font-bold hover:bg-brand-orange transition disabled:opacity-60 mt-4 shadow-lg shadow-brand-navy/10"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>
      </div>

      <aside className="bg-white rounded shadow p-6 h-fit">
        <h2 className="text-xl font-bold text-brand-navy mb-4">Order Summary</h2>
        <ul className="divide-y">
          {items.map((it) => (
            <li key={it.id} className="py-3 flex justify-between text-sm">
              <span>
                {it.name} × {it.qty}
              </span>
              <span>{fmt(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {tax ? (
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{fmt(tax)}</span>
            </div>
          ) : null}
          {shipping ? (
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{fmt(shipping)}</span>
            </div>
          ) : null}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-brand-navy">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}