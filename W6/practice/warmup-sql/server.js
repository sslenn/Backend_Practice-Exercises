import express from 'express';
import * as repo from './articleRepository.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('SQL warmup API running'));

app.get('/articles',     (req, res) => res.json(repo.getAll()));

app.get('/articles/:id', (req, res) => {
  const article = repo.getById(req.params.id);
  return article ? res.json(article) : res.status(404).json({ error: 'Not found' });
});

app.post('/articles',    (req, res) => res.status(201).json(repo.create(req.body)));

app.put('/articles/:id', (req, res) =>
  repo.update(req.params.id, req.body)
    ? res.json({ id: Number(req.params.id), ...req.body })
    : res.status(404).json({ error: 'Not found' }));

app.delete('/articles/:id', (req, res) =>
  repo.remove(req.params.id) ? res.status(204).end() : res.status(404).json({ error: 'Not found' }));

app.listen(5000, () => console.log('Server on http://localhost:5000'));
