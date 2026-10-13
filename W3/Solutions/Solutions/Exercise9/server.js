// server.js — Exercise 09: API for Course Records
// Starter code: EX-2  (bug-fixed import syntax)
// Goal: Build a filterable course catalog API.

import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3000;

// ─────────────────────────────────────────────
// Q1 – Route: GET /departments/:dept/courses
// Captures the department name from the URL path.
//
// Q2 – Accepts query parameters to filter results:
//   ?level       → "undergraduate" or "graduate"
//   ?minCredits  → integer minimum credit value
//   ?maxCredits  → integer maximum credit value
//   ?semester    → "fall", "spring", etc.
//   ?instructor  → partial, case-insensitive match
//
// Q3 – Returns a JSON array of matching courses with a meta.total count.
//
// Q4 – Edge cases handled:
//   • minCredits > maxCredits → 400 Bad Request
//   • No matching courses    → 200 with empty results array
//   • Unknown query params   → silently ignored
// ─────────────────────────────────────────────
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // ── Edge Case: validate credit range ──────────────────────────────
    // Parse only when values are actually present
    const min = minCredits !== undefined ? parseInt(minCredits, 10) : undefined;
    const max = maxCredits !== undefined ? parseInt(maxCredits, 10) : undefined;

    if (min !== undefined && isNaN(min)) {
        return res.status(400).json({ error: 'minCredits must be a valid integer' });
    }
    if (max !== undefined && isNaN(max)) {
        return res.status(400).json({ error: 'maxCredits must be a valid integer' });
    }
    if (min !== undefined && max !== undefined && min > max) {
        return res.status(400).json({
            error: 'Invalid credit range: minCredits cannot be greater than maxCredits',
        });
    }

    // ── Implementing the filter logic ─────────────────────────────────
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    let filtered = courses.filter((course) => {
        // 1. Always match the department from the route parameter (:dept)
        //    Case-insensitive so "cse" and "CSE" both work
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;

        // 2. Filter by level if provided
        if (level && course.level.toLowerCase() !== level.toLowerCase()) return false;

        // 3. Filter by minimum credits if provided
        if (min !== undefined && course.credits < min) return false;

        // 4. Filter by maximum credits if provided
        if (max !== undefined && course.credits > max) return false;

        // 5. Filter by semester if provided
        if (semester && course.semester.toLowerCase() !== semester.toLowerCase()) return false;

        // 6. Filter by instructor — partial, case-insensitive match
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;

        return true; // All active filters passed → include this course
    });

    // ── Return JSON response ──────────────────────────────────────────
    res.status(200).json({
        results: filtered,
        meta: { total: filtered.length },
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
