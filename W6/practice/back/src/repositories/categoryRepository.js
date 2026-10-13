import pool from '../utils/database.js';

// Get all categories
export async function getAllCategories() {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
}

// Get all articles filtered by category ID (with category name)
export async function getArticlesByCategory(categoryId) {
  const [rows] = await pool.query(
    `SELECT articles.*, categories.name AS category_name
     FROM articles
     JOIN article_categories ON articles.id = article_categories.article_id
     JOIN categories ON article_categories.category_id = categories.id
     WHERE categories.id = ?`,
    [categoryId]
  );
  return rows;
}
