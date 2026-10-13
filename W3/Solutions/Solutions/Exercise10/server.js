// server.js — Exercise 10: Enhance an API with Middleware
// Applies logging, validation, and (bonus) auth middleware to the course API.

import express from 'express';
import courses from '../Exercise9/course.js'; // Reuse course data from Ex09

import requestLogger   from './middleware/logger.js';
import validateCreditQuery from './middleware/validateQuery.js';
import tokenAuth       from './middleware/auth.js';

const app = express();
const PORT = 3000;


app.use(requestLogger);

app.get(
    '/departments/:dept/courses',
    validateCreditQuery,   // Q2: route-specific validation middleware
    // tokenAuth,          // Q3 Bonus: uncomment to enable token auth on this route only
    (req, res) => {
        const { dept } = req.params;
        const { level, minCredits, maxCredits, semester, instructor } = req.query;

        // By the time we reach here, validateCreditQuery has already
        // confirmed minCredits and maxCredits are valid integers (if present).
        const min = minCredits !== undefined ? parseInt(minCredits, 10) : undefined;
        const max = maxCredits !== undefined ? parseInt(maxCredits, 10) : undefined;

        // Filter courses using all provided criteria
        const filtered = courses.filter((course) => {
            if (course.department.toLowerCase() !== dept.toLowerCase())            return false;
            if (level     && course.level.toLowerCase()     !== level.toLowerCase())     return false;
            if (min !== undefined && course.credits < min)                         return false;
            if (max !== undefined && course.credits > max)                         return false;
            if (semester  && course.semester.toLowerCase()  !== semester.toLowerCase())  return false;
            if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
            return true;
        });

        res.status(200).json({
            results: filtered,
            meta: { total: filtered.length },
        });
    }
);

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
