import { mutation } from "./_generated/server";

// Clear all data from the database (products, productSets, collections, categories, orders)
export default mutation({
    args: {},
    handler: async (ctx) => {
        const results = {
            products: 0,
            productSets: 0,
            collections: 0,
            categories: 0,
            orders: 0,
        };

        // Clear all products
        const products = await ctx.db.query("products").collect();
        for (const product of products) {
            await ctx.db.delete(product._id);
        }
        results.products = products.length;

        // Clear all productSets
        const productSets = await ctx.db.query("productSets").collect();
        for (const productSet of productSets) {
            await ctx.db.delete(productSet._id);
        }
        results.productSets = productSets.length;

        // Clear all collections
        const collections = await ctx.db.query("collections").collect();
        for (const collection of collections) {
            await ctx.db.delete(collection._id);
        }
        results.collections = collections.length;

        // Clear all categories
        const categories = await ctx.db.query("categories").collect();
        for (const category of categories) {
            await ctx.db.delete(category._id);
        }
        results.categories = categories.length;

        // Clear all orders
        const orders = await ctx.db.query("orders").collect();
        for (const order of orders) {
            await ctx.db.delete(order._id);
        }
        results.orders = orders.length;

        return { success: true, ...results };
    },
});
