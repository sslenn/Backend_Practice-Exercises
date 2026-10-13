// Article model and business logic
import { seedArticles } from "../data/seed.js";

class ArticleModel {
  constructor() {
    this.articles = [...seedArticles];
  }

  // Get all articles
  getAllArticles() {
    return this.articles;
  }

  // Get article by ID
  getArticleById(id) {
    return this.articles.find((a) => a.id === parseInt(id));
  }

  // Create new article
  createArticle(title, author, content, journalist, category) {
    // Validation
    if (!title || !author || !content) {
      return {
        success: false,
        error: "Title, author, and content are required",
      };
    }

    const newArticle = {
      id:
        this.articles.length > 0
          ? Math.max(...this.articles.map((a) => a.id)) + 1
          : 1,
      title,
      author,
      content,
      journalist: journalist || author,
      category: category || "General",
    };

    this.articles.push(newArticle);
    return {
      success: true,
      data: newArticle,
    };
  }

  // Update article by ID
  updateArticle(id, updates) {
    const article = this.getArticleById(id);
    if (!article) {
      return {
        success: false,
        error: "Article not found",
      };
    }

    if (updates.title) article.title = updates.title;
    if (updates.author) article.author = updates.author;
    if (updates.content) article.content = updates.content;
    if (updates.journalist) article.journalist = updates.journalist;
    if (updates.category) article.category = updates.category;

    return {
      success: true,
      data: article,
    };
  }

  // Delete article by ID
  deleteArticle(id) {
    const index = this.articles.findIndex((a) => a.id === parseInt(id));
    if (index === -1) {
      return {
        success: false,
        error: "Article not found",
      };
    }

    const deletedArticle = this.articles.splice(index, 1);
    return {
      success: true,
      data: deletedArticle[0],
    };
  }
}

// Export singleton instance
export const articleModel = new ArticleModel();
