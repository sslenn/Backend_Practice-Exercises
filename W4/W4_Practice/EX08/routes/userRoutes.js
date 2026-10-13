import express from "express";
import * as userController from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

// Define routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", validateUser, userController.createUser);
router.put("/users/:id", validateUser, userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
