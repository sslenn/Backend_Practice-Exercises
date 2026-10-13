import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory data storage
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Routes

// GET / - Home endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Simple API' });
});

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.json({ success: true, data: users });
});

// GET /users/:id - Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.json({ success: true, data: user });
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
  };
  
  users.push(newUser);
  res.status(201).json({ success: true, message: 'User created', data: newUser });
});

// PUT /users/:id - Update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  
  res.json({ success: true, message: 'User updated', data: user });
});

// DELETE /users/:id - Delete a user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  const deletedUser = users.splice(index, 1);
  res.json({ success: true, message: 'User deleted', data: deletedUser });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
