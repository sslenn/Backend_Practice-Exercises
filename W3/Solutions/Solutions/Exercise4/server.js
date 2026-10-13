// server.js — Exercise 04: The Filter Specialist (req.query)
// Goal: Use query strings (the part after the ?) to "filter" a response.

import express from 'express';

const app = express();
const PORT = 3000;

// Sample data to filter
const products = [
    { id: 1, name: 'Laptop',   category: 'electronics', price: 999  },
    { id: 2, name: 'Phone',    category: 'electronics', price: 699  },
    { id: 3, name: 'T-Shirt',  category: 'clothing',    price: 25   },
    { id: 4, name: 'Jeans',    category: 'clothing',    price: 55   },
    { id: 5, name: 'Headphones', category: 'electronics', price: 199 },
];

// ─────────────────────────────────────────────
// Route: GET /products
// Accepts optional query parameters to filter results:
//   ?category=electronics   → filter by category
//   ?maxPrice=500           → filter by maximum price
//
// Example: GET /products?category=electronics&maxPrice=500
// Returns only electronics under $500
// ─────────────────────────────────────────────
app.get('/products', (req, res) => {
    const { category, maxPrice } = req.query;

    // Start with the full list and progressively narrow it down
    let filtered = products;

    // Filter by category if provided
    if (category) {
        filtered = filtered.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Filter by maxPrice if provided (parse to number first)
    if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (!isNaN(max)) {
            filtered = filtered.filter((p) => p.price <= max);
        }
    }

    res.json({
        results: filtered,
        meta: { total: filtered.length },
    });
});

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
