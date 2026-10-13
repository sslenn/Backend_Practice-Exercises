// Middleware 
export const onlyPOSTAllowedMiddleware = (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }
  next();
};
