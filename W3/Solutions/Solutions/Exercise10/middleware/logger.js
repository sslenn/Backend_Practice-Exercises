// logger.js — Exercise 10: Enhance an API with Middleware
// Q1 – Logging middleware: logs method, path, query params, and timestamp
//      for every incoming request.

/**
 * requestLogger
 * Applied globally via app.use(requestLogger) in server.js.
 *
 * Logs:
 *   [ISO timestamp] METHOD /path  Query: { key: value }
 */
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}  Query: ${JSON.stringify(req.query)}`);
    next(); // Always call next() so the request continues down the chain
};

export default requestLogger;
