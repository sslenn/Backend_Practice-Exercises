// server.js — Exercise 07: The Logic Gate (Status Codes)
// Goal: Practice sending different HTTP status codes based on user input.

import express from 'express';

const app = express();
const PORT = 3000;

// ─────────────────────────────────────────────
// Route: GET /check-score
// Reads a "score" from the query string and responds with:
//   • 400 Bad Request  → score is missing or not a number
//   • 200 OK           → score is between 0 and 100 (inclusive)
//   • 400 Bad Request  → score is outside the valid 0–100 range
//
// Test in Apidog:
//   http://localhost:3000/check-score?score=40  → 200 OK   (valid)
//   http://localhost:3000/check-score?score=abc → 400 Bad Request (not a number)
//   http://localhost:3000/check-score?score=110 → 400 Bad Request (out of range)
//   http://localhost:3000/check-score           → 400 Bad Request (missing)
// ─────────────────────────────────────────────
app.get('/check-score', (req, res) => {
    const { score } = req.query;

    // Case 1: score parameter is missing entirely
    if (score === undefined) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Missing required query parameter: score',
        });
    }

    const numericScore = Number(score);

    // Case 2: score is not a valid number
    if (isNaN(numericScore)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `"${score}" is not a valid number`,
        });
    }

    // Case 3: score is outside the valid range (0–100)
    if (numericScore < 0 || numericScore > 100) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `Score must be between 0 and 100. Got: ${numericScore}`,
        });
    }

    // Case 4: All checks passed — 200 OK
    return res.status(200).json({
        score: numericScore,
        message: `Valid score received: ${numericScore}`,
    });
});

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
