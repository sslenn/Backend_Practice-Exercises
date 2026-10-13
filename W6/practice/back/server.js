import express, { json } from 'express';
import cors from 'cors';
import articleRouter from './src/routes/articleRoutes.js';
import journalistRouter from './src/routes/journalistRoutes.js';
import categoryRouter from './src/routes/categoryRoutes.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/api/articles', articleRouter);
app.use('/api/journalists', journalistRouter);
app.use('/api/categories', categoryRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
