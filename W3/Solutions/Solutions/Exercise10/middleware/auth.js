// auth.js — Exercise 10: Enhance an API with Middleware
// Q3 (Bonus) – Token-based authentication middleware.
//
// Simulates basic API security by requiring a ?token=xyz123 query parameter.
// Can be applied globally or to specific routes.

const VALID_TOKEN = 'xyz123'; // In production this would come from env vars

/**
 * tokenAuth
 *
 * If the ?token query parameter is missing or incorrect → 401 Unauthorized.
 * If the token is valid → call next() and continue.
 *
 * Usage:
 *   app.use(tokenAuth)                        // globally
 *   app.get('/route', tokenAuth, handler)     // route-specific
 */
const tokenAuth = (req, res, next) => {
    const { token } = req.query;

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'A valid token query parameter is required. Example: ?token=xyz123',
        });
    }

    if (token !== VALID_TOKEN) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'The provided token is invalid.',
        });
    }

    // Token is valid — continue
    next();
};

export default tokenAuth;
