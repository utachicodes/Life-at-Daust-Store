import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWishlist = query({
    args: { ip: v.string() },
    handler: async (ctx, args) => {
        const wishlist = await ctx.db
            .query("wishlists")
            .withIndex("by_ip", (q) => q.eq("ip", args.ip))
            .unique();
        return wishlist ? wishlist.products : [];
    },
});

export const toggleWishlist = mutation({
    args: {
        ip: v.string(),
        product: v.any()
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("wishlists")
            .withIndex("by_ip", (q) => q.eq("ip", args.ip))
            .unique();

        const productId = args.product._id || args.product.id;

        if (existing) {
            const hasProduct = existing.products.find(
                (p: any) => (p._id || p.id) === productId
            );

            let newProducts;
            if (hasProduct) {
                newProducts = existing.products.filter(
                    (p: any) => (p._id || p.id) !== productId
                );
            } else {
                newProducts = [...existing.products, args.product];
            }

            await ctx.db.patch(existing._id, { products: newProducts });
            return newProducts;
        } else {
            const products = [args.product];
            await ctx.db.insert("wishlists", {
                ip: args.ip,
                products,
            });
            return products;
        }
    },
});
