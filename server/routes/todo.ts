import { Router } from "express";
import { createTodo, getTodos } from "../services/todo";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post("/todos", authenticate, createTodo);
router.get("/todos", authenticate, getTodos);

export default router;
