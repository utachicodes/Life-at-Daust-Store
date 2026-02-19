import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Plus, Search, Edit2, Trash2, Package } from "lucide-react";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CollectionForm from "./CollectionForm";

export default function AdminCollections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  const collections = useQuery(api.collections.list);
  const removeCollection = useMutation(api.collections.removeCollection);

  const handleEdit = (collection) => {
    setEditingCollection(collection);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Delete this collection? Products will be unassigned."
      )
    ) {
      try {
        await removeCollection({ id });
      } catch (error) {
        console.error("Failed to delete collection:", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCollection(null);
  };

  const filteredCollections = collections?.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (collections === undefined) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-brand-navy/30 text-xs font-medium">
          Loading collections...
        </p>
      </div>
    );
  }

  if (showForm) {
    return (
      <CollectionForm
        collection={editingCollection}
        onClose={handleFormClose}
        onSave={handleFormClose}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:max-w-sm relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/25 h-4 w-4" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-brand-navy/[0.06] rounded-lg pl-10 pr-4 h-10 text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
          />
        </div>
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
          className="h-10 px-5"
        >
          <Plus size={16} className="mr-1.5" />
          Add Collection
        </Button>
      </div>

      {/* Collections Grid */}
      {filteredCollections && filteredCollections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCollections.map((collection) => (
            <div
              key={collection._id}
              className="bg-white rounded-xl border border-brand-navy/[0.04] p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-brand-ivory rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="text-brand-navy/20" size={20} />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-brand-navy truncate">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-brand-navy/30">
                    /{collection.slug}
                  </p>
                </div>
              </div>

              {collection.description && (
                <p className="text-xs text-brand-navy/40 line-clamp-2 mb-4">
                  {collection.description}
                </p>
              )}

              <div className="flex items-center justify-end gap-1 pt-3 border-t border-brand-navy/[0.04]">
                <button
                  onClick={() => handleEdit(collection)}
                  className="p-2 text-brand-navy/25 hover:text-brand-orange rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(collection._id)}
                  className="p-2 text-brand-navy/25 hover:text-red-500 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-brand-ivory flex items-center justify-center mx-auto mb-4">
            <Package className="h-5 w-5 text-brand-navy/20" />
          </div>
          <h3 className="text-sm font-semibold text-brand-navy mb-1">
            {searchQuery ? "No collections found" : "No collections yet"}
          </h3>
          <p className="text-xs text-brand-navy/35 mb-4">
            {searchQuery
              ? "Try a different search term."
              : "Create your first collection to get started."}
          </p>
          {!searchQuery && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowForm(true)}
            >
              <Plus size={14} className="mr-1.5" />
              Add Collection
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
