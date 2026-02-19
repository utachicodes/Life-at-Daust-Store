import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Star, Heart, Info, Shield, Truck } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();

  const isConvexId = typeof id === "string" && id.length > 10;
  const convexProduct = useQuery(
    api.products.getById,
    isConvexId ? { id: id } : "skip"
  );

  const product = useMemo(() => {
    if (convexProduct) return convexProduct;
    const numericId = parseInt(id);
    if (!isNaN(numericId)) return PRODUCTS.find((p) => p.id === numericId);
    return null;
  }, [id, convexProduct]);

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || null);
    }
  }, [product]);

  if (isConvexId && convexProduct === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-ivory mb-6">
          <Info size={28} className="text-brand-navy/20" />
        </div>
        <h2 className="font-serif text-2xl text-brand-navy mb-3">
          Product not found
        </h2>
        <p className="text-sm text-brand-navy/40 mb-8 max-w-sm mx-auto">
          This item may have been moved or is currently unavailable.
        </p>
        <Link to="/shop">
          <Button variant="secondary" size="md">
            Return to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-brand-navy/[0.04]">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-brand-navy/30">
          <Link to="/" className="hover:text-brand-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={10} className="mx-2 text-brand-navy/15" />
          <Link
            to="/shop"
            className="hover:text-brand-orange transition-colors"
          >
            Shop
          </Link>
          <ChevronRight size={10} className="mx-2 text-brand-navy/15" />
          <span className="text-brand-navy/60 truncate">{product.name}</span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-brand-ivory">
            <img
              src={mainImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === img
                      ? "border-brand-orange"
                      : "border-transparent opacity-50"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.badge && (
            <span className="inline-block w-fit px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] font-semibold mb-4">
              {product.badge}
            </span>
          )}
          <h1 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-brand-navy leading-tight mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-brand-navy">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 rounded-md">
              <Star size={13} fill="#fbbf24" className="text-yellow-400" />
              <span className="text-xs font-medium text-brand-navy/60">
                {product.rating}
              </span>
            </div>
          </div>

          <p className="text-sm text-brand-navy/45 leading-relaxed mb-8">
            {product.description ||
              "Inspired by campus life, this DAUST essential combines comfort with university spirit."}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-brand-navy/35 mb-3">
                Color:{" "}
                <span className="text-brand-navy font-medium">
                  {selectedColor?.name}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full ring-2 ring-offset-3 transition-all ${
                      selectedColor?.name === color.name
                        ? "ring-brand-orange"
                        : "ring-transparent"
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/5"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <p className="text-xs text-brand-navy/35 mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[56px] h-11 px-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedSize === size
                        ? "border-brand-navy bg-brand-navy text-white"
                        : "border-brand-navy/[0.08] text-brand-navy/50 hover:border-brand-navy/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-6 border-t border-brand-navy/[0.04]">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center bg-brand-ivory rounded-lg h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-full rounded-l-lg text-brand-navy/40 hover:text-brand-navy text-lg transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-medium text-brand-navy">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="w-10 h-full rounded-r-lg text-brand-navy/40 hover:text-brand-navy text-lg transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                variant="primary"
                size="lg"
                className="flex-1 h-12 group"
                onClick={() => {
                  if (product.colors?.length > 0 && !selectedColor) {
                    alert("Please select a color");
                    return;
                  }
                  if (product.sizes?.length > 0 && !selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  addItem(
                    {
                      ...product,
                      selectedColor: selectedColor?.name,
                      selectedSize: selectedSize,
                    },
                    quantity
                  );
                }}
              >
                <ShoppingCart
                  size={18}
                  className="mr-2 group-hover:rotate-6 transition-transform"
                />
                Add to Bag
              </Button>

              {/* Wishlist */}
              <button
                className="w-12 h-12 rounded-lg border border-brand-navy/[0.08] flex items-center justify-center text-brand-navy/25 hover:text-red-500 hover:border-red-100 transition-all"
                aria-label="Add to Wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-brand-orange" />
                <span className="text-xs text-brand-navy/35">
                  Free campus delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-500" />
                <span className="text-xs text-brand-navy/35">
                  Secure payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Additional info */}
      <section className="border-t border-brand-navy/[0.04]">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-xs font-medium text-brand-navy/35 uppercase tracking-wider mb-3">
                Materials
              </h4>
              <p className="text-sm text-brand-navy/50 leading-relaxed">
                Every fiber is selected to endure the rigorous yet rewarding
                lifestyle. We prioritize organic cotton and high-density blends.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-brand-navy/35 uppercase tracking-wider mb-3">
                Our Promise
              </h4>
              <p className="text-sm text-brand-navy/50 leading-relaxed">
                Responsibly manufactured to ensure your university pride never
                comes at a cost to the community or planet.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-brand-navy/35 uppercase tracking-wider mb-3">
                Returns
              </h4>
              <p className="text-sm text-brand-navy/50 leading-relaxed">
                Campus exchanges are always free. External returns accepted
                within 14 days of receipt in original condition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
