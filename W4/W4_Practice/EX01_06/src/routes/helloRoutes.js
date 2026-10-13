import express from "express";
const router = express.Router();

// GET /hello -> respond with "Hello from Router!"
router.get("/", (req, res) => {
  res.send("Hello from Router!");
});

export default router;
