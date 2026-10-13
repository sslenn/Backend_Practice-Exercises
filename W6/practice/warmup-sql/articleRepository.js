import db from './database.js';

export function getAll() {
  return db.prepare('SELECT * FROM articles').all();
}

export function getById(id) {
  return db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
}

export function create(a) {
  const info = db.prepare(
    'INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)'
  ).run(a.title, a.content, a.journalist, a.category);
  return getById(info.lastInsertRowid);
}

export function update(id, a) {
  return db.prepare(
    'UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?'
  ).run(a.title, a.content, a.journalist, a.category, id).changes;
}

export function remove(id) {
  return db.prepare('DELETE FROM articles WHERE id = ?').run(id).changes;
}
