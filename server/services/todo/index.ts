import { Todo } from "../../models/Todo";
import {
  createTodoSchema,
  editTodoSchema,
  todoListResponse,
  todoResponse,
} from "./types";
import { Request, Response } from "express";
import { getApiError } from "../../utils/error";
import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { error } from "console";

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

    res.status(StatusCodes.CREATED).json(response);
  } catch (e) {
    const { status, apiError } = getApiError(e as Error);
    res.status(status).json(apiError);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({
      userId: req.body.userId,
    });

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

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching todos", error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Todo not found" });
    }
    res.status(StatusCodes.OK).json({ msg: "Todo deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error deleting todo", error });
  }
};

export const completeTodo = async (req: Request, res: Response) => {
  const { id, isCompleted } = req.params;
  await Todo.findByIdAndUpdate(id, { completed: isCompleted });
  res.status(StatusCodes.OK).json({
    msg: "Todo marked as completed",
  });
};

export const editTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, description, dueDate } = editTodoSchema.parse(req.body);

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dueDate,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Todo not found" });
    }
    const response: todoResponse = {
      id: updatedTodo._id as Types.ObjectId,
      title: updatedTodo.title,
      description: updatedTodo.description,
      dueDate: updatedTodo.dueDate,
      completed: updatedTodo.completed,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    const { status, apiError } = getApiError(error as Error);
    res.status(status).json(apiError);
  }
};
