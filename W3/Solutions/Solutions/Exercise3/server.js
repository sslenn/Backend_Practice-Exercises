// server.js — Exercise 03: The "ID" Hunter (req.params)
// Goal: Practice capturing dynamic segments of a URL path.

import express from 'express';

const app = express();
const PORT = 3000;

app.get('/users/:id', (req, res) => {
    const { id } = req.params; // Extract the dynamic :id segment
    res.json({
        userId: id,
        message: `Fetching user with ID: ${id}`,
    });
});

app.get('/products/:category/:productId', (req, res) => {
    const { category, productId } = req.params;
    res.json({
        category,
        productId,
        message: `Fetching product ${productId} from category: ${category}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
