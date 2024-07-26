import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { ApiErrorMessage } from '../utils/types';
import { StatusCodes } from 'http-status-codes';
import { Project } from '../models/Project';

export const validateProjectId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { projectId } = req.params;
    const { userId } = req.body;

    if (!Types.ObjectId.isValid(projectId)) {
        const error: ApiErrorMessage = {
            msg: 'Invalid project Id',
        };
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }

    const projectExists = await Project.exists({ _id: projectId, userId });
    if (!projectExists) {
        const error: ApiErrorMessage = {
            msg: 'Unauthorized',
        };
        return res.status(StatusCodes.UNAUTHORIZED).json(error);
    }

    next();
};
