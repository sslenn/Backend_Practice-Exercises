// server.js — Exercise 05: The "Next" Step (Middleware)
// Goal: Understand how middleware processes a request before it reaches the final route.

import express from 'express';

const app = express();
const PORT = 3000;

// ─────────────────────────────────────────────
// Middleware 1: Request Logger
// Logs the HTTP method and URL of every incoming request,
// then calls next() to pass control to the next middleware/route.
// ─────────────────────────────────────────────
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // IMPORTANT: without next(), the request hangs here
};

// ─────────────────────────────────────────────
// Middleware 2: Simulated Auth Check
// Checks for a simple "secret" query parameter.
// If missing, it short-circuits the chain with a 401.
// ─────────────────────────────────────────────
const authCheck = (req, res, next) => {
    const { secret } = req.query;
    if (secret !== 'mySecret') {
        return res.status(401).json({ error: 'Unauthorized: missing or wrong secret' });
    }
    next(); // Secret is correct – continue to the route
};

// ─────────────────────────────────────────────
// Apply the logger globally (runs for every request)
// ─────────────────────────────────────────────
app.use(requestLogger);

// ─────────────────────────────────────────────
// Route: GET /
// Public – no auth required
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
    res.send('Welcome! This route is public.');
});

// ─────────────────────────────────────────────
// Route: GET /protected
// Protected – authCheck middleware applied to this route only
// Example: GET /protected?secret=mySecret
// ─────────────────────────────────────────────
app.get('/protected', authCheck, (req, res) => {
    res.json({ message: 'Welcome to the protected route!' });
});

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
