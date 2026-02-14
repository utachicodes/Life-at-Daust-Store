import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { Trash2, Plus, Minus, ShoppingBag } from "react-feather";

export default function Cart() {
  const { items, removeItem, setQty, count, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-brand-navy mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to get started with your order.</p>
          <Link
            to="/shop"
            className="inline-block bg-brand-navy text-white px-8 py-3 rounded-md font-medium hover:bg-brand-orange transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-navy mb-8">Shopping Cart ({count} items)</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-navy">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    disabled={item.qty <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    disabled={item.qty >= 99}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-brand-navy">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({count} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold text-brand-navy mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-brand-navy text-white py-3 px-4 rounded-md font-medium hover:bg-brand-orange transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full mt-3 text-brand-navy py-3 px-4 rounded-md font-medium border border-brand-navy hover:bg-brand-navy hover:text-white transition-colors text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
