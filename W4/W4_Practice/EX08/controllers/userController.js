import * as userModel from "../models/userModel.js";

// GET /users - List all users
export const getAllUsers = (req, res) => {
  const users = userModel.getAllUsers();
  res.json(users);
};

// GET /users/:id - Get one user
export const getUserById = (req, res) => {
    
    // parse user id into integer
  const userId = parseInt(req.params.id);
  const user = userModel.getUserById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

// POST /users - Create new user
export const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = userModel.createUser(name, email);
  res.status(201).json(newUser);
};

// PUT /users/:id - Update user
export const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = userModel.updateUser(userId, name, email);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
};

// DELETE /users/:id - Delete user
export const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const deleted = userModel.deleteUser(userId);
  if (!deleted) return res.status(404).json({ error: "User not found" });

  res.status(204).send();
};
