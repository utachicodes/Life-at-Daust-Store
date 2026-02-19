import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-xl mb-4">Life at DAUST</h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Apparel and essentials inspired by campus life, designed for the DAUST community.
            </p>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections/summer" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/limited" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} Life at DAUST. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/35 hover:text-white/60 text-xs transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/35 hover:text-white/60 text-xs transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
