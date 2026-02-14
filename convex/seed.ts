import { mutation } from "./_generated/server";
import { SEED_PRODUCTS } from "./data";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    for (const product of SEED_PRODUCTS) {
      await ctx.db.insert("products", product);
    }
    return "Seed complete!";
  },
});
