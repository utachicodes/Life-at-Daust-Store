import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [ip, setIp] = useState("");
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("ip_wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    // Get IP address on mount
    useEffect(() => {
        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => setIp(data.ip))
            .catch(err => console.error("Error fetching IP:", err));
    }, []);

    // Fetch wishlist from Convex based on IP
    const dbWishlist = useQuery(api.wishlist.getWishlist, ip ? { ip } : "skip");
    const toggleWishlistMutation = useMutation(api.wishlist.toggleWishlist);

    // Sync local state when DB data changes
    useEffect(() => {
        if (dbWishlist) {
            setWishlist(dbWishlist);
            localStorage.setItem("ip_wishlist", JSON.stringify(dbWishlist));
        }
    }, [dbWishlist]);

    const toggleWishlist = async (product) => {
        // Optimistic update locally
        const productId = product._id || product.id;
        const newWishlist = wishlist.some((item) => (item._id || item.id) === productId)
            ? wishlist.filter((item) => (item._id || item.id) !== productId)
            : [...wishlist, product];

        setWishlist(newWishlist);
        localStorage.setItem("ip_wishlist", JSON.stringify(newWishlist));

        // Backend sync if IP is available
        if (ip) {
            try {
                await toggleWishlistMutation({ ip, product });
            } catch (error) {
                console.error("Failed to sync wishlist:", error);
            }
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => (item._id || item.id) === productId);
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, wishlistCount }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
