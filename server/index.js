import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL);

app.use(cors());
app.use(express.json());

// Proxy endpoints or custom logic
app.get("/api/products", async (req, res) => {
    try {
        const products = await convex.query(api.products.list);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await convex.query(api.products.getById, { id: req.params.id });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
