import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Edit2,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  Filter,
  Package,
} from "lucide-react";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { formatPrice } from "../../utils/format.js";
import AdminProductForm from "./ProductForm";

export default function AdminProducts() {
  const products = useQuery(api.products.list);
  const removeProduct = useMutation(api.products.removeProduct);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const isLoading = products === undefined;

  const filteredProducts =
    products?.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  const categories = [
    "All",
    ...new Set(products?.map((p) => p.category) || []),
  ];

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This cannot be undone."
      )
    ) {
      try {
        await removeProduct({ id });
      } catch (err) {
        console.error("Failed to delete product", err);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleFormSave = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-brand-navy/30 text-xs font-medium">
          Loading catalog...
        </p>
      </div>
    );
  }

  if (isFormOpen) {
    return (
      <AdminProductForm
        product={editingProduct}
        onSave={handleFormSave}
        onCancel={() => setIsFormOpen(false)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:max-w-sm relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/25 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-brand-navy/[0.06] rounded-lg pl-10 pr-4 h-10 text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none bg-white border border-brand-navy/[0.06] rounded-lg px-4 h-10 pr-9 text-xs font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-navy/25 pointer-events-none" />
          </div>

          <Button
            variant="primary"
            onClick={handleAdd}
            className="h-10 px-5 flex-shrink-0"
          >
            <Plus size={16} className="mr-1.5" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-brand-navy/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-brand-navy/[0.04]">
                <th className="px-5 py-3.5 text-xs font-medium text-brand-navy/35">
                  Product
                </th>
                <th className="px-5 py-3.5 text-xs font-medium text-brand-navy/35 hidden md:table-cell">
                  Category
                </th>
                <th className="px-5 py-3.5 text-xs font-medium text-brand-navy/35">
                  Price
                </th>
                <th className="px-5 py-3.5 text-xs font-medium text-brand-navy/35 hidden lg:table-cell">
                  Rating
                </th>
                <th className="px-5 py-3.5 text-xs font-medium text-brand-navy/35 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-navy/[0.03]">
              {filteredProducts.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-brand-cream/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-brand-ivory rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-navy">
                          {p.name}
                        </p>
                        <p className="text-xs text-brand-navy/30">
                          {p._id.substring(0, 10)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-brand-navy/50 bg-brand-ivory px-2.5 py-1 rounded-md">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-brand-navy">
                      {formatPrice(p.price)}
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-brand-navy/60">
                        {p.rating}
                      </span>
                      <span className="text-yellow-400 text-xs">&#9733;</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-2 text-brand-navy/25 hover:text-brand-orange rounded-md transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 text-brand-navy/25 hover:text-red-500 rounded-md transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                      <Link
                        to={`/product/${p._id}`}
                        target="_blank"
                        className="p-2 text-brand-navy/25 hover:text-brand-navy rounded-md transition-colors"
                        title="View in Store"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-ivory flex items-center justify-center mb-4">
                        <Package className="h-5 w-5 text-brand-navy/20" />
                      </div>
                      <h3 className="text-sm font-semibold text-brand-navy mb-1">
                        No products found
                      </h3>
                      <p className="text-xs text-brand-navy/35 max-w-xs mx-auto mb-4">
                        Try adjusting your search or filters.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setFilterCategory("All");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
