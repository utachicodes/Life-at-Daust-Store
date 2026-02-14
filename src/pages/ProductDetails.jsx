import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Star, Heart, Share2, Check } from "react-feather";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext.js";

export default function ProductDetails() {
    const { id } = useParams();
    const { addItem } = useCart();

    // Try to fetch from Convex if ID seems like a Convex ID (string),
    // otherwise fallback to static products (which use numeric IDs)
    const convexProduct = useQuery(api.products.getById, {
        id: typeof id === "string" && id.length > 5 ? id : undefined
    });

    const product = useMemo(() =>
        convexProduct || PRODUCTS.find(p => p.id === parseInt(id)),
        [id, convexProduct]
    );

    const [mainImage, setMainImage] = useState(product?.image);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
                <Link to="/shop" className="mt-4 text-brand-orange hover:underline inline-block">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const gallery = product.images || [product.image];

    return (
        <div className="bg-white">
            {/* Breadcrumbs */}
            <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
                <Link to="/" className="hover:text-brand-navy">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <Link to="/shop" className="hover:text-brand-navy">Shop</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {gallery.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition ${mainImage === img ? "border-brand-orange" : "border-transparent opacity-70"
                                    }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info & Actions */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        {product.badge && (
                            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
                                {product.badge}
                            </span>
                        )}
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
                        <div className="mt-4 flex items-center gap-4">
                            <span className="text-2xl font-bold text-brand-navy">${product.price.toFixed(2)}</span>
                            <div className="flex items-center text-yellow-400">
                                <Star size={18} fill="currentColor" />
                                <span className="ml-1 text-gray-600 font-medium">{product.rating}</span>
                                <span className="ml-1 text-gray-400 text-sm">(124 reviews)</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description || "Inspired by campus life, this DAUST essential combines comfort with university spirit. Perfect for everyday wear or as a special gift."}
                    </p>

                    {/* Variants Section */}
                    <div className="space-y-8 mb-10">
                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                                    Color: <span className="text-gray-500 font-normal">{selectedColor?.name}</span>
                                </h3>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border-2 p-0.5 transition flex items-center justify-center ${selectedColor?.name === color.name ? "border-brand-orange" : "border-gray-200"
                                                }`}
                                        >
                                            <span
                                                className="w-full h-full rounded-full shadow-inner"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            {selectedColor?.name === color.name && (
                                                <Check size={14} className="absolute text-white drop-shadow-md" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Select Size</h3>
                                    <button className="text-xs text-brand-orange font-bold uppercase hover:underline">Size Chart</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[56px] h-11 px-4 rounded-lg font-bold border-2 transition ${selectedSize === size
                                                ? "border-brand-navy bg-brand-navy text-white"
                                                : "border-gray-200 text-gray-700 hover:border-brand-navy"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add to Cart Actions */}
                    <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden h-14">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-4 h-full hover:bg-gray-50 text-xl"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => Math.min(99, q + 1))}
                                    className="px-4 h-full hover:bg-gray-50 text-xl"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    addItem({
                                        ...product,
                                        selectedColor: selectedColor?.name,
                                        selectedSize: selectedSize
                                    }, quantity);
                                    // Optional: add a tiny visual feedback here
                                }}
                                className="flex-1 bg-brand-navy text-white font-bold rounded-lg h-14 flex items-center justify-center gap-3 hover:bg-brand-orange transition active:scale-[0.98]"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button className="w-14 h-14 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition">
                                <Heart size={20} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4">
                            <div className="flex items-center gap-1">
                                <Check size={16} className="text-green-500" />
                                <span>In stock & ready to ship</span>
                            </div>
                            <button className="flex items-center gap-1 hover:text-brand-navy">
                                <Share2 size={16} />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Product Details Tabs (Optional enhancement) */}
            <section className="max-w-7xl mx-auto px-4 py-16 mt-8 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Quality Materials</h4>
                        <p className="text-gray-500 text-sm italic">"Crafted with the finest materials to ensure comfort during long laboratory sessions and campus activities."</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Sustainability</h4>
                        <p className="text-gray-500 text-sm">Part of our "Green DAUST" initiative—responsibly sourced and manufactured to minimize environmental footprint.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Fast Shipping</h4>
                        <p className="text-gray-500 text-sm">Free shipping across the campus. External orders are processed and shipped within 48 hours.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
