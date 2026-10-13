import express from 'express';
import { sequelize } from './models/index.js';
import libraryRoutes from './routes/libraryRoutes.js';

const app = express();
app.use(express.json());          // json() — parse JSON request bodies
app.use('/', libraryRoutes);

await sequelize.sync({ force: true });   // sync()

app.listen(process.env.PORT || 4000, () =>
  console.log('Library API running')
);