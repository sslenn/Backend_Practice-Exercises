import pool from '../utils/database.js';

// Get one article with its journalist's name
export async function getArticleWithJournalist(id) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalists.name AS journalist_name
     FROM articles
     LEFT JOIN journalists ON articles.journalist_id = journalists.id
     WHERE articles.id = ?`,
    [id]
  );
  return rows[0] || null;
}

// Get all articles by a specific journalist
export async function getArticlesByJournalist(journalistId) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalists.name AS journalist_name
     FROM articles
     LEFT JOIN journalists ON articles.journalist_id = journalists.id
     WHERE journalists.id = ?`,
    [journalistId]
  );
  return rows;
}

// Get all journalists
export async function getAllJournalists() {
  const [rows] = await pool.query('SELECT * FROM journalists');
  return rows;
}
