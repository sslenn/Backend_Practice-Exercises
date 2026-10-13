// server.js — Exercise 01: Refactoring
// Refactored from Node.js native http module to Express.js

import express from 'express';

const app = express();
const PORT = 3000;

// ─────────────────────────────────────────────
// Middleware: parse incoming JSON & URL-encoded bodies
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Route: GET /
// Previously required manual req.url + req.method checks
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page!');
});

// ─────────────────────────────────────────────
// Route: GET /about
// ─────────────────────────────────────────────
app.get('/about', (req, res) => {
    res.status(200).send('About Page');
});

// ─────────────────────────────────────────────
// Route: POST /submit
// Previously required manually reading chunks and parsing req body
// ─────────────────────────────────────────────
app.post('/submit', (req, res) => {
    const body = req.body;
    res.status(200).json({ message: 'Data received', data: body });
});

// ─────────────────────────────────────────────
// Fallback: 404 Not Found
// Previously required an if/else at the bottom of the request handler
// ─────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).send('404 – Page Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
