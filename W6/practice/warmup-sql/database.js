import Database from 'better-sqlite3';

const db = new Database('my_database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    content    TEXT,
    journalist VARCHAR(100),
    category   VARCHAR(50)
  );
`);

const count = db.prepare('SELECT COUNT(*) AS n FROM articles').get().n;
if (count === 0) {
  db.prepare(
    'INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)'
  ).run('Future of AI', 'AI is rapidly evolving...', 'Ronan', 'Tech');
}

export default db;
