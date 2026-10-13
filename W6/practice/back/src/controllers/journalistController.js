import * as repo from '../repositories/journalistRepository.js';

// GET /api/articles/:id  → article + journalist name
//  Retrieves a single article joined with its journalist's name.
export async function getArticleWithJournalist(req, res) {
  try {
    const article = await repo.getArticleWithJournalist(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /api/journalists/:id/articles  → all articles by journalist
//  Retrieves all articles written by a specific journalist.
export async function getArticlesByJournalist(req, res) {
  try {
    const articles = await repo.getArticlesByJournalist(req.params.id);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /api/journalists  → all journalists
//  Retrieves a list of all journalists.
export async function getAllJournalists(req, res) {
  try {
    const journalists = await repo.getAllJournalists();
    res.json(journalists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
