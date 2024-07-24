import { Todo } from "../../models/Todo";
import { createTodoSchema } from "./types";
import { Request, Response } from "express";
import { getApiError } from "../../utils/error";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const createTodoRequest = createTodoSchema.parse(req.body);

    await Todo.create(createTodoRequest);

    res.status(201).json({ msg: "Todo created" });
  } catch (e) {
    const { status, apiError } = getApiError(e as Error);
    res.status(status).json(apiError);
  }
};
