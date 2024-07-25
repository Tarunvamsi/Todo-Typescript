import { Router } from "express";
import {
  createTodo,
  getTodos,
  deleteTodo,
  completeTodo,
  editTodo,
} from "../services/todo";
import { authenticate } from "../middlewares/auth";
import { validTodoId } from "../middlewares/todo";

const router = Router();

router.get("/todos", authenticate, getTodos);
router.post("/todos", authenticate, createTodo);
router.patch(
  "/todos/:id/completed/:isCompleted",
  authenticate,
  validTodoId,
  completeTodo
);
router.put("/todos/:id", authenticate, validTodoId, editTodo);
router.delete("/todos/:id", authenticate, validTodoId, deleteTodo);

export default router;
