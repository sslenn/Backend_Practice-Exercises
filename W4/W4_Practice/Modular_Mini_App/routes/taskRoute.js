import express from 'express';
import * as taskController from '../controllers/taskController.js';
import validateTask from '../middleware/validateTask.js';

const router = express.Router();

router.get('/', taskController.listTasks);

// Apply the validation middleware ONLY on POST /
router.post('/tasks', validateTask, taskController.createTask);

export default router;