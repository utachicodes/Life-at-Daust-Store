import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { NAV_LINKS } from "../data/navigation.js";

export default function Navbar() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const collections = useQuery(api.collections.list);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = ({ isActive }) =>
    `text-[13px] font-medium transition-colors duration-200 ${
      isActive
        ? "text-brand-orange"
        : "text-brand-navy/70 hover:text-brand-navy"
    }`;

  const dynNavLinks = NAV_LINKS.map((link) => {
    if (link.name === "Collections" && collections) {
      return {
        ...link,
        dropdown: collections.map((c) => ({
          name: c.name,
          path: `/collections/${c.slug}`,
        })),
      };
    }
    return link;
  });

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "glass-morphism shadow-sm"
          : "bg-brand-cream/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {dynNavLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group dropdown">
                  <button className="flex items-center gap-1 text-[13px] font-medium text-brand-navy/70 hover:text-brand-navy transition-colors">
                    {link.name}
                    <ChevronDown
                      size={13}
                      className="opacity-50 group-hover:rotate-180 transition-transform duration-300"
                    />
                  </button>
                  <div className="dropdown-menu absolute hidden pt-3 w-52 -left-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-brand-navy/[0.06] overflow-hidden py-1.5">
                      {link.dropdown.length > 0 ? (
                        link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-5 py-2.5 text-sm text-brand-navy/70 hover:text-brand-orange hover:bg-brand-cream/50 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-sm text-brand-navy/30">
                          No collections
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={link.name} to={link.path} className={navClasses}>
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          {/* Center Logo */}
          <Link
            to="/"
            className="flex flex-col items-center leading-none group absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <span className="font-serif text-xl tracking-tight text-brand-navy">
              LIFE AT DAUST
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button
              className="hidden lg:flex text-brand-navy/50 hover:text-brand-navy transition-colors"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>
            <Link
              to="/cart"
              className="relative text-brand-navy/50 hover:text-brand-navy transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-brand-navy p-1"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-[150] transition-opacity duration-400 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-brand-cream z-[200] shadow-2xl transition-transform duration-400 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="p-6 flex justify-between items-center border-b border-brand-navy/[0.06]">
          <span className="font-serif text-lg text-brand-navy">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-brand-navy/50"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-6">
          {dynNavLinks.map((link) => (
            <div key={link.name} className="mb-6">
              {link.dropdown ? (
                <>
                  <p className="text-[11px] font-semibold text-brand-navy/35 uppercase tracking-[0.15em] mb-3">
                    {link.name}
                  </p>
                  <div className="space-y-1 pl-3 border-l border-brand-navy/[0.06]">
                    {link.dropdown.length > 0 ? (
                      link.dropdown.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className="block py-2 text-base text-brand-navy/70 hover:text-brand-orange transition-colors"
                        >
                          {sub.name}
                        </NavLink>
                      ))
                    ) : (
                      <p className="text-sm text-brand-navy/30 py-2">
                        No collections
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  className="block text-lg font-medium text-brand-navy hover:text-brand-orange transition-colors py-1"
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-brand-navy/[0.06]">
          <Link
            to="/cart"
            className="flex items-center justify-center gap-3 h-12 bg-brand-navy text-white rounded-lg font-medium text-sm transition-colors hover:bg-brand-navy/90"
          >
            <ShoppingBag size={16} />
            Shopping Bag {count > 0 && `(${count})`}
          </Link>
        </div>
      </div>
    </nav>
  );
}
