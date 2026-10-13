// Logger middleware
// this aim to log the HTTP method, URL, and timestamp of each incoming request
export const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
