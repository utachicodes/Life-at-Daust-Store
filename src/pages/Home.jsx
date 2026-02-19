import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ArrowRight } from "lucide-react";
import Newsletter from "../components/Newsletter.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import Button from "../components/ui/Button.jsx";
import { PRODUCTS } from "../data/products.js";

export default function Home() {
  const collections = useQuery(api.collections.list);
  const convexProducts = useQuery(api.products.list);
  const products = (convexProducts && convexProducts.length > 0) ? convexProducts : PRODUCTS;

  // Pick 4 featured products for the grid
  const featured = products.slice(0, 4);

  return (
    <main>
      {/* Announcement Bar */}
      <div className="bg-brand-navy text-white text-center py-2.5 text-xs font-medium tracking-wide">
        Free Campus Delivery on All Orders
      </div>

      {/* Hero Section - Split Layout */}
      <section className="bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[65vh]">
            {/* Left: Text Content on subtle bg */}
            <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-20 bg-brand-ivory/50 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-12 relative">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-orange mb-6">
                EST. 2024 &mdash; Student-Run
              </p>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-brand-navy leading-[1.08] tracking-tight text-balance mb-6">
                Life at DAUST
              </h1>
              <p className="text-base text-brand-navy/55 leading-relaxed max-w-md mb-10">
                Explore our collections, inspired by campus life and community spirit. Premium apparel and essentials for the DAUST community.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    Shop Now
                  </Button>
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-semibold text-brand-navy/70 hover:text-brand-orange transition-colors flex items-center gap-2 group"
                >
                  Our Story
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Featured Product Image */}
            <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-brand-ivory">
              {featured.length > 0 && featured[0].image ? (
                <img
                  src={featured[0].image}
                  alt="Featured product"
                  className="w-full h-full object-cover object-center"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full bg-brand-ivory" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Browser - Horizontal cards like Harvard Shop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {collections === undefined ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 h-32">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))
          ) : collections.length > 0 ? (
            collections.map((c) => (
              <Link
                to={`/collections/${c.slug}`}
                key={c.slug}
                className="group flex items-center justify-between bg-white rounded-lg p-5 lg:p-6 border border-brand-navy/[0.04] hover:border-brand-navy/10 transition-all duration-300 hover:shadow-sm"
              >
                <div>
                  <h3 className="font-serif text-base lg:text-lg text-brand-navy mb-1.5">
                    {c.name}
                  </h3>
                  <span className="text-xs font-medium text-brand-orange flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
                {c.image && (
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-md overflow-hidden flex-shrink-0 ml-4">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-brand-navy/40 text-sm">
              Collections coming soon.
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-[var(--text-3xl)] text-brand-navy mb-2">
              Featured Products
            </h2>
            <p className="text-sm text-brand-navy/50">
              Carefully curated pieces that define the DAUST experience.
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-orange transition-colors group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {convexProducts === undefined ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))
          ) : (
            featured.map((p, idx) => (
              <Link
                to={`/product/${p.id || p._id}`}
                key={p.id || p._id}
                className="group"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-brand-ivory mb-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-medium text-brand-navy line-clamp-1 group-hover:text-brand-orange transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-brand-navy/50 mt-0.5">
                  {new Intl.NumberFormat('fr-FR', { style: 'decimal', minimumFractionDigits: 0 }).format(p.price)} CFA
                </p>
              </Link>
            ))
          )}
        </div>

        <Link
          to="/shop"
          className="sm:hidden flex items-center justify-center gap-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-orange transition-colors mt-8 group"
        >
          View All Products
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Value Props */}
      <section className="border-y border-brand-navy/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
            <div>
              <h3 className="font-serif text-lg text-brand-navy mb-2">Premium Quality</h3>
              <p className="text-sm text-brand-navy/50 leading-relaxed">
                High-density cotton blends and reinforced stitching built to last.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-brand-navy mb-2">Campus Delivery</h3>
              <p className="text-sm text-brand-navy/50 leading-relaxed">
                Free delivery to campus locations within 2-4 business days.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-brand-navy mb-2">Community First</h3>
              <p className="text-sm text-brand-navy/50 leading-relaxed">
                A portion of every sale supports DAUST events and initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
