import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProductCard from "../components/ProductCard.jsx";
import Newsletter from "../components/Newsletter.jsx";
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES } from "../data/products.js";

export default function Shop() {
  const convexProducts = useQuery(api.products.list);
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Featured");

  // Fallback to static data if Convex is not yet configured or loading
  const PRODUCTS = convexProducts || STATIC_PRODUCTS;

  const items = useMemo(() => {
    const filtered = PRODUCTS.filter((p) =>
      category === "All Categories" ? true : p.category === category
    );
    if (sort === "Price: Low to High") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "Newest Arrivals") return [...filtered].sort((a, b) => b.id - a.id);
    return filtered;
  }, [category, sort]);

  return (
    <main>
      {/* Hero */}
      <div className="relative bg-brand-navy">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-40"
            src="http://static.photos/fashion/1200x630/42"
            alt="Shop banner"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Summer Collection
          </h1>
          <p className="mt-6 text-xl text-brand-cream max-w-3xl">
            Discover our latest premium fabrics and timeless designs.
          </p>
          <div className="mt-10">
            <a
              href="#products"
              className="inline-block bg-brand-orange py-3 px-8 rounded-md font-medium text-white hover:bg-orange-600"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-brand-navy">All Products</h2>
          <div className="flex gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brand-orange"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brand-orange"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((p, idx) => (
            <div key={p.id} data-aos="fade-up" data-aos-delay={100 * (idx % 4)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}