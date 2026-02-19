import React from "react";

export default function About() {
  return (
    <main>
      {/* Hero */}
      <div className="bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-orange mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight text-balance mb-6">
            About Life at DAUST
          </h1>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed">
            Blending campus culture, fashion, and community into apparel that
            tells the DAUST story.
          </p>
        </div>
      </div>

      {/* Body */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        <div className="max-w-2xl">
          <p className="text-brand-navy/60 text-base leading-relaxed">
            Our collections celebrate academic excellence, creativity, and
            unity. We make apparel that DAUST students and alumni are proud to
            wear -- on campus, across the city, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Quality",
              text: "Premium fabrics, reinforced seams, long-lasting color.",
            },
            {
              title: "Design",
              text: "Campus-inspired styles, versatile fits, seasonless palettes.",
            },
            {
              title: "Community",
              text: "A portion of sales supports DAUST events and initiatives.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-xl border border-brand-navy/[0.04] p-6"
            >
              <h3 className="font-serif text-lg text-brand-navy mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-brand-navy/45 leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
