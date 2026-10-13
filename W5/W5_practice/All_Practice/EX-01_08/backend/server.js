import express from "express";
import { config } from "./config/config.js";
import { setupMiddleware } from "./middleware/middleware.js";
import { articlesRouter } from "./routes/articles.js";

const app = express();
const PORT = config.PORT;

// Setup middleware
setupMiddleware(app);

// Register routes
app.use("/articles", articlesRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n Backend server running on http://localhost:${PORT}`);
  console.log(` Available endpoints:`);
  console.log(`   GET    /articles        - Get all articles`);
  console.log(`   GET    /articles/:id    - Get article by ID`);
  console.log(`   POST   /articles        - Create new article`);
  console.log(`   PUT    /articles/:id    - Update article`);
  console.log(`   DELETE /articles/:id    - Delete article\n`);
});
