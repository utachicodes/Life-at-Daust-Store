import React, { useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext.js";

const STORAGE_KEY = "lifeAtDaust.cart.v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min(next[i].qty + qty, 99) };
        return next;
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: Math.min(qty, 99),
      }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const setQty = (id, qty) =>
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, Math.min(99, qty)) } : p));

  const count = useMemo(() => items.reduce((n, p) => n + p.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, p) => s + p.price * p.qty, 0), [items]);

  const value = { items, addItem, removeItem, setQty, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}