import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("orders").order("desc").collect();
    },
});

export const getById = query({
    args: { id: v.id("orders") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const addOrder = mutation({
    args: {
        orderId: v.string(),
        customer: v.object({
            name: v.string(),
            email: v.string(),
            year: v.string(),
        }),
        items: v.array(v.object({
            name: v.string(),
            qty: v.number(),
            price: v.number(),
            color: v.optional(v.string()),
            size: v.optional(v.string()),
        })),
        subtotal: v.number(),
        total: v.number(),
    },
    handler: async (ctx, args) => {
        const orderId = await ctx.db.insert("orders", {
            ...args,
            status: "Processing",
            createdAt: Date.now(),
        });
        return orderId;
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("orders"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});
