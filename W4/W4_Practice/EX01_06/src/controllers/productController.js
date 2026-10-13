import * as productModel from '../models/productModel.js';

// Controller for GET /products
export const getProducts = (req, res) => {
  const data = productModel.getAllProducts();
  res.json(data);
};

// Controller for GET /products/:id
export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);  // convert string to number
  const product = productModel.findProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};