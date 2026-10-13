// In-memory dummy data
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Phone', price: 800 },
];

// Function to return all products
export function getAllProducts() {
  return products;
}

// Function to find a product by id
export function findProductById(id) {
  return products.find(p => p.id === id);
}