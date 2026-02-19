import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const displayImage =
    isHovered && product.images?.length > 1
      ? product.images[1]
      : product.image;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory rounded-lg mb-3">
        <Link to={`/product/${product.id || product._id}`} className="block w-full h-full">
          <img
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-[1.03]" : "scale-100"
            }`}
            src={displayImage}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-brand-navy/40 hover:text-red-500 transition-colors z-10"
          aria-label="Add to Wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-brand-orange text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick Add - Desktop */}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          } hidden lg:block`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product, 1);
            }}
            className="w-full h-10 rounded-lg bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-medium flex items-center justify-center gap-2 hover:bg-brand-navy hover:text-white transition-all duration-200 active:scale-[0.97]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <Link to={`/product/${product.id || product._id}`} className="block">
          <h3 className="text-sm font-medium text-brand-navy line-clamp-1 group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-brand-navy/35 mt-0.5">{product.category}</p>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-semibold text-brand-navy">
            {formatPrice(product.price)}
          </p>
          {/* Mobile cart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, 1);
            }}
            className="lg:hidden p-2 rounded-md bg-brand-ivory text-brand-navy active:bg-brand-navy active:text-white transition-colors"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
