import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import Button from "../components/ui/Button";

export default function Cart() {
  const { items, removeItem, setQty, count, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-ivory mb-8">
          <ShoppingBag className="h-8 w-8 text-brand-navy/20" />
        </div>
        <h1 className="font-serif text-[var(--text-3xl)] text-brand-navy mb-3">
          Your bag is empty
        </h1>
        <p className="text-brand-navy/50 mb-10 max-w-sm mx-auto text-sm">
          Items stay in your bag for a limited time. Don't miss out on your favorites.
        </p>
        <Link to="/shop">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="font-serif text-[var(--text-3xl)] text-brand-navy mb-1">
            Shopping Bag
          </h1>
          <p className="text-sm text-brand-navy/40">
            {count} {count === 1 ? "item" : "items"}
          </p>
        </div>
        <Link
          to="/shop"
          className="text-sm font-medium text-brand-navy/40 hover:text-brand-orange transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Items */}
        <div className="lg:col-span-8">
          <div className="border-t border-brand-navy/[0.06]">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-5 py-6 border-b border-brand-navy/[0.06]"
              >
                {/* Image */}
                <div className="w-24 sm:w-28 aspect-[3/4] rounded-lg overflow-hidden bg-brand-ivory flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-medium text-brand-navy line-clamp-2">
                      {item.name}
                    </h3>
                    <button
                      onClick={() =>
                        removeItem(
                          item.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                      className="p-1.5 text-brand-navy/25 hover:text-red-500 transition-colors flex-shrink-0 ml-4"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-brand-navy/40 mb-auto">
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-brand-navy/[0.08] rounded-lg h-9">
                      <button
                        onClick={() =>
                          setQty(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.qty - 1
                          )
                        }
                        className="w-9 h-full flex items-center justify-center text-brand-navy/40 hover:text-brand-navy transition-colors disabled:opacity-30"
                        disabled={item.qty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-brand-navy">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          setQty(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.qty + 1
                          )
                        }
                        className="w-9 h-full flex items-center justify-center text-brand-navy/40 hover:text-brand-navy transition-colors disabled:opacity-30"
                        disabled={item.qty >= 99}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-brand-navy">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl border border-brand-navy/[0.06] p-6 lg:p-8 sticky top-24">
            <h2 className="font-serif text-lg text-brand-navy mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-brand-navy/50">Subtotal</span>
                <span className="font-medium text-brand-navy">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-navy/50">Shipping</span>
                <span className="text-brand-orange text-xs font-medium">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-navy/50">Tax</span>
                <span className="text-brand-navy/50 text-xs">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="border-t border-brand-navy/[0.06] pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-brand-navy">
                  Estimated Total
                </span>
                <span className="text-lg font-serif text-brand-navy">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/checkout" className="block">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full group"
                >
                  Checkout
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-0.5 transition-transform"
                  />
                </Button>
              </Link>
              <Link to="/shop" className="block">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
