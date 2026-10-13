import express from 'express';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
