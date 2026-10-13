import * as taskModel from '../models/taskModel.js';

export const listTasks = (req, res) => {
  res.json(taskModel.getAll());
};

export const createTask = (req, res) => {
  const created = taskModel.add(req.body);
  res.status(201).json(created);
};