import express from "express";
import { logger } from "./middleware/logger.js";
import articlesRoutes from "./routes/articlesRoutes.js";
import journalistsRoutes from "./routes/journalistsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(logger); // Log requests

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to News API",
    endpoints: {
      articles: "/articles",
      journalists: "/journalists",
      categories: "/categories",
    },
  });
});

// API Routes
app.use("/articles", articlesRoutes);
app.use("/journalists", journalistsRoutes);
app.use("/categories", categoriesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.path}`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
