import express from 'express';
import cors from 'cors';
import { onlyPOSTAllowedMiddleware } from './src/middleware/middleware.js';
import productRoutes from './src/routes/product.js';
import sequelize from './src/configs/database.js';


const app = express();
const PORT = 3002;

// Allow all origins
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies
// app.use(onlyPOSTAllowedMiddleware);

try {
  await sequelize.authenticate();
  await sequelize.sync({ force: false }); // Sync models with the database
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


// Use routes
app.use('/api/product', productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});