import { Todo } from "../../models/Todo";
import { createTodoSchema, todoListResponse, todoResponse } from "./types";
import { Request, Response } from "express";
import { getApiError } from "../../utils/error";
import { Types } from "mongoose";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const createTodoRequest = createTodoSchema.parse(req.body);

    const { _id, title, description, completed, dueDate } = await Todo.create(
      createTodoRequest
    );

    const response: todoResponse = {
      id: _id as Types.ObjectId,
      title,
      description,
      completed,
      dueDate,
    };

    res.status(201).json(response);
  } catch (e) {
    const { status, apiError } = getApiError(e as Error);
    res.status(status).json(apiError);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ userId: req.body.userId });

    const response: todoListResponse = todos.map((todo) => {
      const todoResponse: todoResponse = {
        id: todo._id as Types.ObjectId,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        completed: todo.completed,
      };
      return todoResponse;
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching todos", error });
  }
};
