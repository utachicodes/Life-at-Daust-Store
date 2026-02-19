import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProductCard from "../components/ProductCard.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES } from "../data/products.js";
import { Filter, ChevronDown, X, LayoutGrid } from "lucide-react";

export default function Shop() {
  const convexProducts = useQuery(api.products.list);
  const collections = useQuery(api.collections.list);
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Featured");

  const PRODUCTS =
    convexProducts && convexProducts.length > 0
      ? convexProducts
      : STATIC_PRODUCTS;
  const isLoading = convexProducts === undefined || collections === undefined;

  const itemsByCollection = useMemo(() => {
    if (isLoading) return {};

    const filtered = PRODUCTS.filter((p) =>
      category === "All Categories" ? true : p.category === category
    );

    let sorted = [...filtered];
    if (sort === "Price: Low to High")
      sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low")
      sorted.sort((a, b) => b.price - a.price);
    if (sort === "Newest Arrivals") sorted.sort((a, b) => b.id - a.id);

    const groups = {};

    const sortedCollections = [...collections].sort((a, b) => {
      if (a.name.toLowerCase().includes("daustian")) return -1;
      if (b.name.toLowerCase().includes("daustian")) return 1;
      return a.name.localeCompare(b.name);
    });

    sortedCollections.forEach((col) => {
      groups[col.name] = [];
    });
    groups["Other Items"] = [];

    sorted.forEach((p) => {
      const colName = p.collection || "Other Items";
      if (!groups[colName]) groups[colName] = [];
      groups[colName].push(p);
    });

    Object.keys(groups).forEach((key) => {
      if (groups[key].length === 0) delete groups[key];
    });

    return groups;
  }, [PRODUCTS, collections, category, sort, isLoading]);

  const totalItems = useMemo(() => {
    return Object.values(itemsByCollection).reduce(
      (acc, curr) => acc + curr.length,
      0
    );
  }, [itemsByCollection]);

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-orange mb-4">
            Browse
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight text-balance mb-3">
            All Products
          </h1>
          <p className="text-base text-white/40 max-w-md">
            Discover premium university apparel and essentials designed for the
            DAUST community.
          </p>
        </div>
      </div>

      {/* Filters */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-lg font-semibold text-brand-navy mb-0.5">
              {category === "All Categories" ? "Store Catalog" : category}
            </h2>
            <p className="text-sm text-brand-navy/35">
              {isLoading
                ? "Loading..."
                : `${totalItems} items across ${
                    Object.keys(itemsByCollection).length
                  } collections`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.slice(0, 4).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    category === c
                      ? "bg-brand-navy text-white"
                      : "bg-white text-brand-navy/50 border border-brand-navy/[0.06] hover:border-brand-navy/15"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-brand-navy/[0.06] hidden md:block" />

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white text-brand-navy text-xs font-medium pl-4 pr-9 py-2.5 rounded-lg border border-brand-navy/[0.06] focus:outline-none focus:ring-2 focus:ring-brand-orange/20 cursor-pointer"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-navy/25 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active filters */}
        {category !== "All Categories" && (
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs text-brand-navy/30">Filtered by:</span>
            <button
              onClick={() => setCategory("All Categories")}
              className="flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange px-3 py-1.5 rounded-md text-xs font-medium hover:bg-brand-orange/15 transition-colors"
            >
              {category}
              <X size={12} />
            </button>
          </div>
        )}

        {/* Products */}
        <div className="space-y-16">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))}
            </div>
          ) : totalItems > 0 ? (
            Object.entries(itemsByCollection).map(([colName, products]) => (
              <div key={colName}>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-navy/[0.04]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-brand-ivory rounded-md flex items-center justify-center">
                      <LayoutGrid
                        className="text-brand-navy/30"
                        size={16}
                      />
                    </div>
                    <h3 className="text-base font-semibold text-brand-navy">
                      {colName}
                    </h3>
                  </div>
                  <span className="text-xs text-brand-navy/30">
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"}
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {products.map((p) => (
                    <ProductCard key={p.id || p._id} product={p} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-ivory mb-4">
                <Filter className="h-6 w-6 text-brand-navy/20" />
              </div>
              <h3 className="text-base font-semibold text-brand-navy mb-2">
                No products found
              </h3>
              <p className="text-sm text-brand-navy/35 mb-6 max-w-xs mx-auto">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setCategory("All Categories");
                  setSort("Featured");
                }}
                className="text-sm text-brand-orange font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
