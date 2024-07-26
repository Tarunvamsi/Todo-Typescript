import { Todo } from "../../models/Todo";
import {
  completeTodoSchema,
  createTodoSchema,
  editTodoSchema,
  todoListResponse,
  todoResponse,
} from "./types";
import { Request, Response } from "express";
import { getApiError } from "../../utils/error";
import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const createTodoRequest = createTodoSchema.parse(req.body);

    const { _id, title, description, completed, dueDate } = await Todo.create({
        ...createTodoRequest,
        projectId,
    });

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
    const {projectId} = req.params
    const todos = await Todo.find({
      projectId: projectId,
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
    const { todoId } = req.params;
    const result = await Todo.findByIdAndDelete(todoId);
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
    try {
        const { todoId } = req.params;
        const { completed } = completeTodoSchema.parse(req.body);
        await Todo.findByIdAndUpdate(todoId, { completed });
        res.status(StatusCodes.OK).json({
            msg: `Todo marked as ${completed ? 'complete' : 'incomplete'}`,
        });
    } catch (e) {
        const { status, apiError } = getApiError(e as Error);
        res.status(status).json(apiError);
    }
};

export const editTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const { title, description, dueDate } = editTodoSchema.parse(req.body);

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
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
