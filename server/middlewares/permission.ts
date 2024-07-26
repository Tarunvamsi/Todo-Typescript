import { NextFunction, Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { StatusCodes } from 'http-status-codes';
import { Project } from '../models/Project';
import { Types } from 'mongoose';
import { ApiErrorMessage } from '../utils/types';

export const canAccessTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.body;
    const { todoId } = req.params;

    if (!Types.ObjectId.isValid(todoId)) {
        const error: ApiErrorMessage = {
            msg: 'Invalid todo Id',
        };
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: 'Todo not found' });
    }

    const existsForUser = await Project.exists({ userId, _id: todo.projectId });

    if (!existsForUser) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: 'Todo not found' });
    }

    next()
};


export const canAccessProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.body;
    const { projectId } = req.params;

    if (!Types.ObjectId.isValid(projectId)) {
        const error: ApiErrorMessage = {
            msg: 'Invalid todo Id',
        };
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }

    const project = await Project.exists({userId, _id: projectId});
    if (!project) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: 'Todo not found' });
    }

    next()
};