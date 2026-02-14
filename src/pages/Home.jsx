import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Newsletter from "../components/Newsletter.jsx";
import { COLLECTIONS } from "../data/collections.js";

export default function Home() {
  return (
    <main>
      <Hero
        title="Life at DAUST"
        subtitle="Explore our collections, inspired by campus life and community spirit."
        cta="Shop Now"
        image="http://static.photos/fashion/1200x630/42"
        to="/shop"
      />

      {/* Featured collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-brand-navy mb-8">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((c) => (
            <Link
              to={`/collections/${c.slug}`}
              key={c.slug}
              className="group relative rounded-lg overflow-hidden shadow bg-white"
              data-aos="fade-up"
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 p-4">
                <h3 className="text-white text-xl font-semibold">{c.title}</h3>
                <p className="text-brand-orange text-sm">Explore styles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}