import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

export default function Hero({
  title,
  subtitle,
  cta,
  to = "/",
  image,
  align = "left",
}) {
  return (
    <section className="relative bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[60vh] lg:min-h-[70vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
            {title && (
              <h1
                className="font-serif text-[var(--text-display)] text-brand-navy leading-[1.05] tracking-tight text-balance mb-6 animate-fade-in-up"
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <p
                className="text-lg text-brand-navy/60 leading-relaxed max-w-lg mb-10"
                style={{ animationDelay: "0.1s" }}
              >
                {subtitle}
              </p>
            )}

            {cta && (
              <div style={{ animationDelay: "0.2s" }}>
                <Link to={to}>
                  <Button variant="primary" size="lg">
                    {cta}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            {image && (
              <div className="absolute inset-0 -right-8">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
