import React from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const HERO_IMAGES = {
  summer: "http://static.photos/fashion/1200x630/42",
  DaxUn: "src/assets/DaustianShoot/PHOTO-2026-01-31-23-01-01.jpg",
  limited: "http://static.photos/fashion/1200x630/40",
};

export default function Collection() {
  const { slug } = useParams();

  const title =
    slug === "summer"
      ? "Summer Collection"
      : slug === "DaxUn"
        ? "Daustian x UNIWEAR"
        : "Limited Edition";

  const image = HERO_IMAGES[slug] || HERO_IMAGES.summer;

  const filtered = PRODUCTS.filter((p) => {
    if (slug === "limited") return p.badge?.toLowerCase().includes("limited");
    if (slug === "DaxUn") return ["Sweaters"].includes(p.category);
    return true;
  });

  return (
    <main>
      <div className="relative bg-brand-navy">
        <div className="absolute inset-0 overflow-hidden">
          <img className="w-full h-full object-cover opacity-40" src={image} alt={title} />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-xl text-brand-cream max-w-3xl">
            Explore curated looks from our {title.toLowerCase()}.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((p, idx) => (
            <div key={p.id} data-aos="fade-up" data-aos-delay={100 * (idx % 4)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}