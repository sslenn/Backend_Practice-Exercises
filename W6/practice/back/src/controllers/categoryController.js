import * as repo from '../repositories/categoryRepository.js';

export async function getAllCategories(req, res) {
  try {
    res.json(await repo.getAllCategories());
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getArticlesByCategory(req, res) {
  try {
    res.json(await repo.getArticlesByCategory(req.params.id));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
