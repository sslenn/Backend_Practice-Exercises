import express from 'express';
import taskRoutes from './routes/taskRoute.js';

const app = express();
app.use(express.json());

app.use('/', taskRoutes);   // mount tasks router

app.listen(3000, () => console.log('Mini modular app running on :3000'));