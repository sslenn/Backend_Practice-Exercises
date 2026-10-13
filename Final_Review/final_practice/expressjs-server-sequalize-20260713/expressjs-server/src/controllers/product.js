import Product from '../models/product.js';

class ProductController {
  static async createProduct(req, res) {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ error: 'Name, price, and stock are required' });
    }

    const newProduct = {
      name,
      price,
      stock
    };

    try {
      const createdProduct = await Product.create(newProduct);
      return res.status(201).json({ message: 'Product created successfully', product: createdProduct });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
    }
  }
}

export default ProductController;