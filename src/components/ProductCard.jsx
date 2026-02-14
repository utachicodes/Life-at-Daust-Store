import React from "react";
import { Heart, Star, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative group cursor-pointer">
        <Link to={`/product/${product.id}`}>
          <img
            className="product-image w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white hover:text-red-500 transition" aria-label="Wish">
            <Heart className="h-5 w-5" />
          </button>
        </div>
        {product.badge && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="text-white font-bold text-xs uppercase tracking-widest">{product.badge}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block group">
          <h3 className="text-lg font-medium text-brand-navy group-hover:text-brand-orange transition truncate">{product.name}</h3>
        </Link>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-brand-navy font-bold">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>

        <button
          onClick={() => addItem(product, 1)}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 active:scale-[0.99] transition"
          style={{
            backgroundColor: '#0a2342',
            color: '#ffffff',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f97316';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0a2342';
          }}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}