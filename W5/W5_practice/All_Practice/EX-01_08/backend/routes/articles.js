// Article routes
import express from "express";
import { articleModel } from "../models/article.js";

export const articlesRouter = express.Router();

// GET all articles
articlesRouter.get("/", (req, res) => {
  console.log("GET /articles - Fetching all articles");
  const articles = articleModel.getAllArticles();
  res.json(articles);
});

// GET article by ID
articlesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`GET /articles/${id} - Fetching article with ID ${id}`);

  const article = articleModel.getArticleById(id);
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.json(article);
});

// POST - Create new article
articlesRouter.post("/", (req, res) => {
  const { title, author, content, journalist, category } = req.body;

  console.log("POST /articles - Creating new article");
  const result = articleModel.createArticle(
    title,
    author,
    content,
    journalist,
    category,
  );

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json(result.data);
});

// PUT - Update article by ID
articlesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`PUT /articles/${id} - Updating article`);

  const result = articleModel.updateArticle(id, req.body);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  res.json(result.data);
});

// DELETE - Remove article by ID
articlesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /articles/${id} - Deleting article`);

  const result = articleModel.deleteArticle(id);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  res.json({ message: "Article deleted", article: result.data });
});
