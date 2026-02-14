import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
        name: v.string(),
        category: v.string(),
        price: v.number(),
        rating: v.number(),
        badge: v.optional(v.string()),
        image: v.string(),
        images: v.optional(v.array(v.string())),
        colors: v.optional(v.array(v.object({
            name: v.string(),
            hex: v.string(),
        }))),
        sizes: v.optional(v.array(v.string())),
        description: v.optional(v.string()),
    }),
    categories: defineTable({
        name: v.string(),
    }),
});
