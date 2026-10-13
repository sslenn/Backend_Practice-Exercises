import express from "express";
import helloRoutes from "./src/routes/helloRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import {getAllProducts }  from "./src/models/productModel.js";
import productRoutes from "./src/routes/productRoute.js";
import logger from "./src/middlewares/logger.js";


const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(logger);  // Use the logger middleware for all routes

// Basic route for Exercise 1
app.use("/", helloRoutes);
// Router with Multiple HTTP Methods for Exercise 2
app.use("/books", bookRoutes);
// Dynamic Route Parameters for Exercise 3
app.use("/users", userRoutes);

// Route to get all products
app.get("/products", (req, res) => {
  res.json(getAllProducts());
});

// mount under /products
app.use("/products", productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
