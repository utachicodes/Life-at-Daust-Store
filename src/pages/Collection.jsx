import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProductCard from "../components/ProductCard.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";

export default function Collection() {
  const { slug } = useParams();
  const collection = useQuery(api.collections.getBySlug, { slug });
  const products = useQuery(api.products.list);

  const isLoading = collection === undefined || products === undefined;
  const filteredProducts =
    products?.filter((p) => p.collection === collection?.name) || [];

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="bg-brand-navy py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <Skeleton className="h-8 w-48 rounded-md bg-white/10" />
            <Skeleton className="h-12 w-80 rounded-md bg-white/10" />
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] rounded-lg" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (!collection) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-serif text-2xl text-brand-navy mb-3">
            Collection Not Found
          </h1>
          <p className="text-sm text-brand-navy/40 mb-8">
            This collection doesn't exist or has been removed.
          </p>
          <Link
            to="/shop"
            className="text-sm text-brand-orange font-medium hover:underline"
          >
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-brand-navy overflow-hidden">
        {collection.image && (
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
            src={collection.image}
            alt=""
          />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-orange mb-4">
            Collection
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight text-balance mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-base text-white/45 max-w-xl leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id || p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-ivory rounded-xl">
            <h3 className="text-base font-semibold text-brand-navy mb-2">
              No products yet
            </h3>
            <p className="text-sm text-brand-navy/35">
              This collection is currently empty.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
