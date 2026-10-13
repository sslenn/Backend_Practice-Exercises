// Reject the request if the body does not contain a "title" field
export default (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  next();
};