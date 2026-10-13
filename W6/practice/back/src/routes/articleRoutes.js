import { Router } from "express";
import { getAllArticles, createArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";
import { getArticleWithJournalist } from "../controllers/journalistController.js";

const articleRouter = Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleWithJournalist);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
