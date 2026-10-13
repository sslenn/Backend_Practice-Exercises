import pool from '../utils/database.js';

export async function getArticles() {
  const [rows] = await pool.query('SELECT * FROM articles');
  return rows;
}

export async function getArticleById(id) {
  const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
  return rows[0] || null;
}

export async function createArticle(article) {
  const [result] = await pool.query(
    'INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)',
    [article.title, article.content, article.journalist, article.category]
  );
  return getArticleById(result.insertId);
}

export async function updateArticle(id, updatedData) {
  const [result] = await pool.query(
    'UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?',
    [updatedData.title, updatedData.content, updatedData.journalist, updatedData.category, id]
  );
  if (result.affectedRows === 0) return null;
  return getArticleById(id);
}

export async function deleteArticle(id) {
  await pool.query('DELETE FROM articles WHERE id = ?', [id]);
}
