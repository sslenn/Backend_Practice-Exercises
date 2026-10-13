// validateQuery.js — Exercise 10: Enhance an API with Middleware
// Q2 – Route-specific middleware that validates credit query parameters.
//
// Applied ONLY to the /departments/:dept/courses route in server.js.

/**
 * validateCreditQuery
 *
 * Rules:
 *   • If minCredits or maxCredits are present, they must be valid integers.
 *   • If both are present and minCredits > maxCredits, respond 400.
 *   • Otherwise call next() to continue.
 */
const validateCreditQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    // Parse only when the parameter is actually present
    const min = minCredits !== undefined ? parseInt(minCredits, 10) : undefined;
    const max = maxCredits !== undefined ? parseInt(maxCredits, 10) : undefined;

    // Validate minCredits is a real integer
    if (minCredits !== undefined && isNaN(min)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `minCredits must be a valid integer. Received: "${minCredits}"`,
        });
    }

    // Validate maxCredits is a real integer
    if (maxCredits !== undefined && isNaN(max)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `maxCredits must be a valid integer. Received: "${maxCredits}"`,
        });
    }

    // Validate logical range: min must not exceed max
    if (min !== undefined && max !== undefined && min > max) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `Invalid credit range: minCredits (${min}) cannot be greater than maxCredits (${max})`,
        });
    }

    // All checks passed — hand off to the next handler
    next();
};

export default validateCreditQuery;
