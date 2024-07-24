import { Router } from "express";
import { createTodo } from "../services/todo";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post("/todos", authenticate, createTodo);

export default router;
