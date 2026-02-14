import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Search, ChevronDown } from "react-feather";
import { useCart } from "../context/CartContext.js";
import logo from "../assets/logo.png";

import { NAV_LINKS } from "../data/navigation.js";

export default function Navbar() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? "text-brand-orange" : "text-gray-700 hover:text-brand-orange"
    }`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Life at DAUST" className="h-8 w-auto" />
              <span className="font-bold text-lg text-brand-navy">Life at DAUST</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button className="flex items-center gap-1 text-gray-700 hover:text-brand-orange transition px-3 py-2 text-sm font-medium">
                    {link.name} <ChevronDown size={16} />
                  </button>
                  <div className="absolute hidden group-hover:block mt-0 w-48 bg-white rounded shadow-lg top-full">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink key={link.name} to={link.path} className={navClasses}>
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          {/* Right side icons */}
          <div className="hidden sm:flex sm:items-center gap-4">
            <button className="text-gray-600 hover:text-brand-orange" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-brand-orange" aria-label="Account">
              <User size={20} />
            </button>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-brand-orange"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-600 hover:text-brand-orange"
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">
          <div className="space-y-1 px-4 pt-2 pb-3">
            {NAV_LINKS.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <div className="px-3 py-2 text-sm font-bold text-gray-900 border-b border-gray-100">
                      {link.name}
                    </div>
                    {link.dropdown.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className="block px-6 py-2 text-sm font-medium text-gray-600 hover:text-brand-orange"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}
            <div className="pt-4 border-t flex justify-around">
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-gray-600">
                <ShoppingBag size={24} />
              </Link>
              <button className="text-gray-600">
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}