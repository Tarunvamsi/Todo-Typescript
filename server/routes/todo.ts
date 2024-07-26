import { Router } from "express";
import {
  createTodo,
  getTodos,
  deleteTodo,
  completeTodo,
  editTodo,
} from "../services/todo";
import { authenticate } from "../middlewares/auth";
import { validateProjectId } from "../middlewares/project";
import { canAccessTodo } from "../middlewares/permission";

const router = Router();

router.get("/projects/:projectId/todos", authenticate,validateProjectId ,getTodos);
router.post("/projects/:projectId/todos", authenticate, validateProjectId,createTodo);
router.patch('/todos/:todoId', authenticate, canAccessTodo, completeTodo);
router.put("/todos/:todoId", authenticate, canAccessTodo, editTodo);
router.delete("/todos/:todoId", authenticate, canAccessTodo, deleteTodo);

export default router;
